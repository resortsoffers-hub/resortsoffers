import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

// English only - Language switcher is simplified
const LanguageSwitcher = () => {
  return (
    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
      <span className="hidden md:inline">🇬🇧 English</span>
      <span className="md:hidden">🇬🇧</span>
    </Button>
  );
};

export default LanguageSwitcher;
