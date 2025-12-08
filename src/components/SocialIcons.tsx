import { Instagram, Send, MessageCircle } from "lucide-react";
import { SocialLinks } from "@/data/siteData";

interface SocialIconsProps {
  socialLinks: SocialLinks;
}

export const SocialIcons = ({ socialLinks }: SocialIconsProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-foreground/10 transition-colors"
      >
        <Instagram className="w-6 h-6" />
      </a>
      <a
        href={socialLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-foreground/10 transition-colors"
      >
        <Send className="w-6 h-6" />
      </a>
      <a
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-foreground/10 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};