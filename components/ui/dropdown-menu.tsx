// Google-style dropdown menu using Radix
import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// === Sub Trigger ===
const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex items-center justify-between rounded-lg px-4 py-2 text-sm transition-colors focus:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-2 size-4 opacity-60" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

// === Sub Content ===
const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[10rem] rounded-lg border border-gray-200 bg-white text-gray-900 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 animate-dropdown-in',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

// === Content ===
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[10rem] rounded-lg border border-gray-200 bg-white p-1 text-gray-900 shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 animate-dropdown-in',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

// === Item ===
const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800',
      inset && 'pl-10',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

// === Checkbox ===
const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      'relative flex select-none items-center rounded-md py-2 pl-10 pr-4 text-sm transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800',
      className
    )}
    {...props}
  >
    <span className="absolute left-4 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="size-4 text-primary" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

// === Radio ===
const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex select-none items-center rounded-md py-2 pl-10 pr-4 text-sm transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800',
      className
    )}
    {...props}
  >
    <span className="absolute left-4 flex size-4 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="size-3 fill-current text-primary" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

// === Label ===
const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500',
      inset && 'pl-10',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

// === Separator ===
const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('my-1 h-px bg-gray-200 dark:bg-gray-700', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

// === Shortcut ===
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs opacity-50', className)} {...props} />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

