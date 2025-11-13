import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/ui/navigation";
import { TrendingUp, DollarSign, MousePointer, Eye, Calendar, ExternalLink } from "lucide-react";
import { getAffiliateAnalytics, generateAffiliateLink } from "@/lib/affiliate";

export default function AffiliateDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    const data = getAffiliateAnalytics();
    setAnalytics(data);
  }, []);

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Panel de Afiliados</h1>
            <p className="text-gray-600">Cargando datos de rendimiento...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Panel de Afiliados TulumTkts
            </h1>
            <p className="text-xl">
              Seguimiento de rendimiento y comisiones de Travelpayouts
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clicks Totales</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalClicks}</div>
                <p className="text-xs text-muted-foreground">
                  +{analytics.clicksLast30Days} últimos 30 días
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reservas Estimadas</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.revenue.estimatedBookings}</div>
                <p className="text-xs text-muted-foreground">
                  Basado en 3% conversión
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Estimados</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{analytics.revenue.estimatedRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Valor total de reservas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comisión Estimada</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">€{analytics.revenue.commission.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  10% comisión Travelpayouts
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categorías Más Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topCategories.length > 0 ? (
                    analytics.topCategories.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.category}</p>
                          <p className="text-sm text-gray-500">{item.count} clicks</p>
                        </div>
                        <Badge variant="secondary">{((item.count / analytics.totalClicks) * 100).toFixed(1)}%</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No hay datos suficientes aún</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Experiences */}
            <Card>
              <CardHeader>
                <CardTitle>Experiencias Más Clickeadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.topExperiences.length > 0 ? (
                    analytics.topExperiences.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.title}</p>
                          <p className="text-sm text-gray-500">{item.count} clicks</p>
                        </div>
                        <Badge variant="outline">{item.count}</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No hay datos suficientes aún</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Affiliate Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Información del Programa de Afiliados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Travelpayouts</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Comisión: 10% promedio (varía por producto)</li>
                    <li>• Cookie Duration: 30 días</li>
                    <li>• Pago mínimo: $50 USD</li>
                    <li>• Productos: Vuelos, Hoteles, Actividades</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tu Enlace de Afiliado</h3>
                  <div className="flex items-center space-x-2">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1 truncate">
                      {generateAffiliateLink('travelpayouts')}
                    </code>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        const url = generateAffiliateLink('travelpayouts');
                        window.open(url, '_blank');
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Tips */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Consejos para Maximizar Comisiones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">📈 Experiencias Premium</h4>
                  <p className="text-sm text-gray-600">
                    Enfócate en tours de alto valor (€200-500+) como tours privados y experiencias VIP
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎯 Paquetes Combinados</h4>
                  <p className="text-sm text-gray-600">
                    Promociona paquetes que incluyan múltiples actividades: ruinas + cenotes + transporte
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⏰ Temporada Alta</h4>
                  <p className="text-sm text-gray-600">
                    Maximiza durante temporada alta (Dic-Abr) y eventos especiales como tiburones ballena
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}