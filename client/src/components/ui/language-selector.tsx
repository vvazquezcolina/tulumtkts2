import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";
import { SUPPORTED_LOCALES, LOCALE_NAMES, LOCALE_FLAGS, SupportedLocale } from "@/lib/i18n";

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as SupportedLocale)}>
      <SelectTrigger className="w-auto min-w-[100px] border-0 shadow-none bg-transparent">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LOCALES.map((langCode) => (
          <SelectItem key={langCode} value={langCode}>
            <div className="flex items-center space-x-2">
              <span>{LOCALE_FLAGS[langCode]}</span>
              <span>{LOCALE_NAMES[langCode]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}