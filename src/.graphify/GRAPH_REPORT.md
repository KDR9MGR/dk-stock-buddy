# Graph Report - src  (2026-06-29)

## Corpus Check
- Corpus is ~22,505 words - fits in a single context window. You may not need a graph.

## Summary
- 369 nodes · 597 edges · 29 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 300 · imports: 164 · imports_from: 126 · calls: 7


## Input Scope
- Requested: all
- Resolved: all (source: configured-default)
- Included files: 69 · Candidates: recursive
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 0 missing committed

## Graph Freshness
- Built from Git commit: `71e9968`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `Button` - 11 edges
3. `Card` - 9 edges
4. `CardContent` - 9 edges
5. `Input` - 9 edges
6. `supabase` - 9 edges
7. `CardHeader` - 8 edges
8. `CardTitle` - 8 edges
9. `useToast()` - 8 edges
10. `Label` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (37): AddStock(), Bills(), BillData, Product, BottomNav(), BottomNavProps, BundleManagement(), Product (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (35): useIsMobile(), Separator, SheetContent, SheetContentProps, SheetDescription, SheetOverlay, SheetTitle, sheetVariants (+27 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (22): BillData, BillProduct, BillProductWithPrice, ExtractedProductDetails, NewProduct, Product, ProductPhoto, createInvoicePdfFile() (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (23): Action, ActionType, actionTypes, addToRemoveQueue(), dispatch(), genId(), listeners, memoryState (+15 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (12): Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (13): Product, ProductInsert, Alert, AlertDescription, AlertTitle, alertVariants, SelectContent, SelectItem (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.19
Nodes (7): cn(), CalendarProps, Checkbox, HoverCardContent, PopoverContent, Progress, Slider

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 11 - "Community 11"
Cohesion: 0.20
Nodes (4): ButtonProps, PaginationContent, PaginationItem, PaginationLinkProps

### Community 12 - "Community 12"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 14 - "Community 14"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 15 - "Community 15"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 16 - "Community 16"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 17 - "Community 17"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 19 - "Community 19"
Cohesion: 0.33
Nodes (1): queryClient

### Community 20 - "Community 20"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 21 - "Community 21"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 22 - "Community 22"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 23 - "Community 23"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 24 - "Community 24"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (2): RadioGroup, RadioGroupItem

### Community 27 - "Community 27"
Cohesion: 0.67
Nodes (2): ScrollArea, ScrollBar

### Community 28 - "Community 28"
Cohesion: 0.67
Nodes (1): ToasterProps

### Community 29 - "Community 29"
Cohesion: 0.67
Nodes (2): Textarea, TextareaProps

## Knowledge Gaps
- **201 isolated node(s):** `queryClient`, `Product`, `ProductInsert`, `BillProduct`, `BillProductWithPrice` (+196 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 19`** (1 nodes): `queryClient`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `RadioGroup`, `RadioGroupItem`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `ScrollArea`, `ScrollBar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (1 nodes): `ToasterProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `Textarea`, `TextareaProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 6` to `Community 21`, `Community 5`, `Community 0`, `Community 22`, `Community 23`, `Community 15`, `Community 8`, `Community 10`, `Community 4`, `Community 12`, `Community 16`, `Community 13`, `Community 7`, `Community 20`, `Community 9`, `Community 17`, `Community 11`, `Community 25`, `Community 26`, `Community 27`, `Community 1`, `Community 2`, `Community 14`, `Community 24`, `Community 29`, `Community 3`, `Community 18`?**
  _High betweenness centrality (0.349) - this node is a cross-community bridge._
- **Why does `Button` connect `Community 0` to `Community 5`, `Community 2`, `Community 8`, `Community 1`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `Input` connect `Community 0` to `Community 5`, `Community 2`, `Community 1`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `queryClient`, `Product`, `ProductInsert` to the rest of the system?**
  _201 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09254901960784313 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.0507399577167019 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08505747126436781 - nodes in this community are weakly interconnected._