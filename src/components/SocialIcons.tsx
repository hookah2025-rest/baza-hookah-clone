import { Send, MessageCircle } from "lucide-react";
import { SocialLinks } from "@/data/siteData";

interface SocialIconsProps {
  socialLinks: SocialLinks;
}

export const SocialIcons = ({ socialLinks }: SocialIconsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <a
        href={socialLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <Send className="w-5 h-5 text-background" />
      </a>
      <a
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <MessageCircle className="w-5 h-5 text-background" />
      </a>
    </div>
  );
};
