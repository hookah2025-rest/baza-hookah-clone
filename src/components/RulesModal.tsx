import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRulesData } from "@/hooks/useRulesData";
interface RulesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const RulesModal = ({
  open,
  onOpenChange
}: RulesModalProps) => {
  const {
    rules,
    loading
  } = useRulesData();
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-content-bg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-center tracking-wider">
            ПРАВИЛА ЗАВЕДЕНИЯ
          </DialogTitle>
        </DialogHeader>
        
        {loading ? <div className="text-center py-4">Загрузка...</div> : <div className="space-y-4 py-4 font-body">
            {rules.map(rule => <p key={rule.id} className="text-sm leading-relaxed bg-transparent text-primary-foreground">
                {rule.number}. {rule.text}
              </p>)}
          </div>}
      </DialogContent>
    </Dialog>;
};