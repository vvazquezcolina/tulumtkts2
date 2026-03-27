import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Hotel, Compass, Car, Shield, Wifi, ArrowRight } from "lucide-react";
import { generateFlightLink, generateHotelLink, generateCarRentalLink, generateTransferLink, generateAffiliateLink, trackAffiliateClick } from "@/lib/affiliate";
import { useI18n } from "@/contexts/i18n-context";

interface TripCost {
  flights: number;
  hotel: number;
  activities: number;
  transport: number;
  insurance: number;
  total: number;
}

export function TripPlanner() {
  const { t } = useI18n();
  const [origin, setOrigin] = useState("MEX");
  const [nights, setNights] = useState("5");
  const [travelers, setTravelers] = useState("2");
  const [budget, setBudget] = useState<"budget" | "mid" | "luxury">("mid");

  const costs: Record<string, TripCost> = {
    budget: {
      flights: 180,
      hotel: 50,
      activities: 30,
      transport: 15,
      insurance: 8,
      total: 0,
    },
    mid: {
      flights: 300,
      hotel: 150,
      activities: 80,
      transport: 30,
      insurance: 12,
      total: 0,
    },
    luxury: {
      flights: 500,
      hotel: 400,
      activities: 150,
      transport: 60,
      insurance: 15,
      total: 0,
    },
  };

  const numTravelers = parseInt(travelers) || 2;
  const numNights = parseInt(nights) || 5;
  const cost = costs[budget];
  const flightTotal = cost.flights * numTravelers;
  const hotelTotal = cost.hotel * numNights;
  const activitiesTotal = cost.activities * numTravelers * Math.ceil(numNights / 2);
  const transportTotal = cost.transport * numTravelers;
  const insuranceTotal = cost.insurance * numTravelers * numNights;
  const grandTotal = flightTotal + hotelTotal + activitiesTotal + transportTotal + insuranceTotal;

  const handleBookClick = (type: string) => {
    let url = "";
    switch (type) {
      case "flights":
        url = generateFlightLink(origin, "CUN");
        trackAffiliateClick("aviasales", "Trip Planner Flight", `${flightTotal}`, "flights");
        break;
      case "hotel":
        url = generateHotelLink("Tulum");
        trackAffiliateClick("hotellook", "Trip Planner Hotel", `${hotelTotal}`, "hotels");
        break;
      case "activities":
        url = "/experiencias";
        break;
      case "transport":
        url = generateTransferLink("Cancun Airport", "Tulum");
        trackAffiliateClick("kiwitaxi", "Trip Planner Transfer", `${transportTotal}`, "transfers");
        break;
      case "insurance":
        url = generateAffiliateLink("https://safetywing.com/nomad-insurance", "safetyWing", "trip_planner_insurance");
        trackAffiliateClick("safetyWing", "Trip Planner Insurance", `${insuranceTotal}`, "insurance");
        break;
    }
    if (url.startsWith("/")) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener");
    }
  };

  const items = [
    { key: "flights", icon: Plane, label: t('tripPlanner.flights'), amount: flightTotal, detail: `${numTravelers} ${t('tripPlanner.travelersUnit')} ${t('tripPlanner.roundTrip')}` },
    { key: "hotel", icon: Hotel, label: t('tripPlanner.hotel'), amount: hotelTotal, detail: `${numNights} ${t('tripPlanner.nightsUnit')}` },
    { key: "activities", icon: Compass, label: t('tripPlanner.activities'), amount: activitiesTotal, detail: `~${Math.ceil(numNights / 2)} ${t('tripPlanner.experiencesUnit')}` },
    { key: "transport", icon: Car, label: t('tripPlanner.transport'), amount: transportTotal, detail: t('tripPlanner.transportDetail') },
    { key: "insurance", icon: Shield, label: t('tripPlanner.insurance'), amount: insuranceTotal, detail: `${numNights} ${t('tripPlanner.coverageUnit')}` },
  ];

  return (
    <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {t('tripPlanner.title')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('tripPlanner.subtitle')}
        </p>

        {/* Config inputs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <Label className="text-sm text-gray-600">{t('tripPlanner.origin')}</Label>
            <Input
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              placeholder="MEX"
              maxLength={3}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-gray-600">{t('tripPlanner.nights')}</Label>
            <Select value={nights} onValueChange={setNights}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[3, 4, 5, 7, 10, 14].map((n) => (
                  <SelectItem key={n} value={n.toString()}>{`${n} ${t('tripPlanner.nightsUnit')}`}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm text-gray-600">{t('tripPlanner.travelers')}</Label>
            <Select value={travelers} onValueChange={setTravelers}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-sm text-gray-600">{t('tripPlanner.budget')}</Label>
            <Select value={budget} onValueChange={(v) => setBudget(v as any)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">{t('tripPlanner.budgetEconomy')}</SelectItem>
                <SelectItem value="mid">{t('tripPlanner.budgetMid')}</SelectItem>
                <SelectItem value="luxury">{t('tripPlanner.budgetPremium')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-3 bg-white rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => handleBookClick(item.key)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">${item.amount.toLocaleString()} USD</span>
                <ArrowRight className="w-4 h-4 text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between p-4 bg-teal-600 text-white rounded-lg">
          <span className="text-lg font-bold">{t('tripPlanner.estimatedTotal')}</span>
          <span className="text-2xl font-bold">${grandTotal.toLocaleString()} USD</span>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          {t('tripPlanner.disclaimer')}
        </p>
      </CardContent>
    </Card>
  );
}
