import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

const languages = [
  { code: "es", name: "Español", flag: "🇲🇽" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" }
];

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
      <SelectTrigger className="w-auto min-w-[100px] border-0 shadow-none bg-transparent">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center space-x-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}