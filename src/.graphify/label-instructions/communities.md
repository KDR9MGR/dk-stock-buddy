# Community Labeling

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the community listing below
and write 2-5 word plain-language names for each.

## Language

Write every name in English (en). Do not switch languages.

## Communities

Community 0: supabase, Button, Card, CardContent, CardHeader, CardTitle, Input, AddStock(, Bills(, BillsTest.tsx, BillData, BillsTest(
Community 1: use-mobile.tsx, useIsMobile(, separator.tsx, Separator, sheet.tsx, SheetContent, SheetContentProps, SheetDescription, SheetFooter(, SheetHeader(, SheetOverlay, SheetTitle
Community 2: Bills.tsx, BillData, BillProduct, BillProductWithPrice, createEmptyProduct(, createId(, ExtractedProductDetails, NewProduct, Product, ProductPhoto, invoicePdf.ts, createInvoicePdfFile(
Community 3: useToast(, use-toast.ts, Action, ActionType, actionTypes, addToRemoveQueue(, dispatch(, genId(, listeners, memoryState, reducer(, State
Community 4: command.tsx, Command, CommandDialog(, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut(, dialog.tsx
Community 5: AddStock.tsx, Product, ProductInsert, alert.tsx, Alert, AlertDescription, AlertTitle, alertVariants, select.tsx, SelectContent, SelectItem, SelectLabel
Community 6: cn(, utils.ts, calendar.tsx, Calendar(, CalendarProps, checkbox.tsx, Checkbox, hover-card.tsx, HoverCardContent, popover.tsx, PopoverContent, progress.tsx
Community 7: Label, form.tsx, FormControl, FormDescription, FormField(, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel, FormMessage
Community 8: carousel.tsx, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions, CarouselPlugin, CarouselPrevious, CarouselProps
Community 9: menubar.tsx, Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut(, MenubarSubContent, MenubarSubTrigger, MenubarTrigger
Community 10: chart.tsx, ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartStyle(, ChartTooltipContent, getPayloadConfigFromPayload(, THEMES, useChart(
Community 11: ButtonProps, pagination.tsx, Pagination(, PaginationContent, PaginationEllipsis(, PaginationItem, PaginationLink(, PaginationLinkProps, PaginationNext(, PaginationPrevious(
Community 12: context-menu.tsx, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(, ContextMenuSubContent, ContextMenuSubTrigger
Community 13: dropdown-menu.tsx, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(, DropdownMenuSubContent, DropdownMenuSubTrigger
Community 14: table.tsx, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow
Community 15: breadcrumb.tsx, Breadcrumb, BreadcrumbEllipsis(, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator(
Community 16: drawer.tsx, Drawer(, DrawerContent, DrawerDescription, DrawerFooter(, DrawerHeader(, DrawerOverlay, DrawerTitle
Community 17: navigation-menu.tsx, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport
Community 18: toggle.tsx, toggle-group.tsx, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants
Community 19: App.tsx, App(, queryClient, main.tsx, NotFound.tsx, NotFound(
Community 20: input-otp.tsx, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot
Community 21: accordion.tsx, AccordionContent, AccordionItem, AccordionTrigger
Community 22: avatar.tsx, Avatar, AvatarFallback, AvatarImage
Community 23: badge.tsx, Badge(, BadgeProps, badgeVariants
Community 24: tabs.tsx, TabsContent, TabsList, TabsTrigger
Community 25: radio-group.tsx, RadioGroup, RadioGroupItem
Community 26: resizable.tsx, ResizableHandle(, ResizablePanelGroup(
Community 27: scroll-area.tsx, ScrollArea, ScrollBar
Community 28: sonner.tsx, Toaster(, ToasterProps
Community 29: textarea.tsx, Textarea, TextareaProps
Community 30: aspect-ratio.tsx
Community 31: collapsible.tsx
Community 32: vite-env.d.ts

## Instructions

Write a single JSON object mapping each community id (as a string) to its
2-5 word name to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/label-instructions/communities.json

Example:
```json
{
  "0": "Authentication Flow",
  "1": "Authentication Flow",
  "2": "Authentication Flow"
}
```

Then re-run `graphify update` (or `graphify label`) to ingest the names.
