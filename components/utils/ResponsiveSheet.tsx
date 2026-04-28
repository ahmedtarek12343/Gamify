import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "../ui/sheet";
import { Drawer, DrawerContent } from "../ui/drawer";

const ResponsiveSheet = ({
  open,
  setOpen,
  children,
  className,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className={"h-[85vh] sm:h-full " + className}>
          {children}
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className={"w-[600px]! sm:max-w-none! " + className}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveSheet;
