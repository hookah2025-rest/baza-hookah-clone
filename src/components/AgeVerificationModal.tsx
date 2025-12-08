import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AgeVerificationModalProps {
  onConfirm: () => void;
  onDecline: () => void;
}

export const AgeVerificationModal = ({ onConfirm, onDecline }: AgeVerificationModalProps) => {
  const [open, setOpen] = useState(true);

  const handleConfirm = () => {
    localStorage.setItem("age_verified", "true");
    setOpen(false);
    onConfirm();
  };

  const handleDecline = () => {
    setOpen(false);
    onDecline();
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && handleDecline()}>
      <DialogContent className="bg-background border-accent/30 max-w-md text-center">
        <DialogTitle className="text-2xl font-bold text-foreground tracking-wider">
          ПОДТВЕРЖДЕНИЕ ВОЗРАСТА
        </DialogTitle>
        <DialogDescription className="text-muted-foreground mt-2">
          Для доступа к меню бара необходимо подтвердить, что вам исполнилось 18 лет
        </DialogDescription>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-accent hover:bg-accent/80 text-accent-foreground font-medium tracking-wider"
          >
            ДА, МНЕ ЕСТЬ 18
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            className="flex-1 border-muted-foreground/30 text-muted-foreground hover:bg-muted/10 font-medium tracking-wider"
          >
            НЕТ, МНЕ НЕТ 18
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
