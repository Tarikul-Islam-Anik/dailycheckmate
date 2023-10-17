import {
  Tooltip as TT,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Tooltip = ({
  children,
  content,
  delayDuration = 300,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  delayDuration?: number;
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TT>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TT>
    </TooltipProvider>
  );
};

export default Tooltip;
