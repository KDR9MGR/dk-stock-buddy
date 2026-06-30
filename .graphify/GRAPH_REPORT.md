# Graph Report - .  (2026-06-30)

## Corpus Check
- Corpus is ~27,767 words - fits in a single context window. You may not need a graph.

## Summary
- 403 nodes · 762 edges · 30 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 304 · imports: 164 · imports_from: 126 · MODIFIES: 116 · ON_BRANCH: 23 · PARENT_OF: 22 · calls: 7


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 83 · Candidates: 99
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 1 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

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
- `4b50eb2 Use tech stack vite_react_shadcn_ts_20250728_minor` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 15 → community 0_
- `71e9968 Add invoice PDF and product extraction flow` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 0_

## Communities

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (3): RadioGroup, RadioGroupItem, 4b50eb2 Use tech stack vite_react_shadcn_ts_20250728_minor

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (17): urlsToCache, BillProduct, BillProductWithPrice, Product, NewProduct, BillData, ProductPhoto, ExtractedProductDetails (+9 more)

### Community 21 - "Community 21"
Cohesion: 0.33
Nodes (1): queryClient

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (13): Product, ProductInsert, alertVariants, Alert, AlertTitle, AlertDescription, SelectTrigger, SelectScrollUpButton (+5 more)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (45): AddStock(), Bills(), BottomNavProps, BottomNav(), BundleManagement(), Product, DashboardStats, DashboardProps (+37 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (23): Product, BillData, Product, LoginScreenProps, LoginScreen(), AlertDialogOverlay, AlertDialogContent, AlertDialogHeader() (+15 more)

### Community 23 - "Community 23"
Cohesion: 0.50
Nodes (3): AccordionItem, AccordionTrigger, AccordionContent

### Community 24 - "Community 24"
Cohesion: 0.50
Nodes (3): Avatar, AvatarImage, AvatarFallback

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (3): badgeVariants, BadgeProps, Badge()

### Community 17 - "Community 17"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage

### Community 12 - "Community 12"
Cohesion: 0.20
Nodes (4): ButtonProps, PaginationContent, PaginationItem, PaginationLinkProps

### Community 6 - "Community 6"
Cohesion: 0.17
Nodes (8): CalendarProps, Checkbox, HoverCardContent, PopoverContent, Progress, Skeleton(), Slider, cn()

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (12): CarouselApi, UseCarouselParameters, CarouselOptions, CarouselPlugin, CarouselProps, CarouselContextProps, CarouselContext, Carousel (+4 more)

### Community 11 - "Community 11"
Cohesion: 0.18
Nodes (7): THEMES, ChartConfig, ChartContextProps, ChartContext, ChartContainer, ChartTooltipContent, ChartLegendContent

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (12): Command, CommandDialogProps, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandSeparator, CommandItem (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.20
Nodes (8): ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator

### Community 18 - "Community 18"
Cohesion: 0.25
Nodes (4): DrawerOverlay, DrawerContent, DrawerTitle, DrawerDescription

### Community 14 - "Community 14"
Cohesion: 0.20
Nodes (8): DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (11): FormFieldContextValue, FormFieldContext, FormItemContextValue, FormItemContext, FormItem, FormLabel, FormControl, FormDescription (+3 more)

### Community 22 - "Community 22"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator

### Community 10 - "Community 10"
Cohesion: 0.17
Nodes (10): Menubar, MenubarTrigger, MenubarSubTrigger, MenubarSubContent, MenubarContent, MenubarItem, MenubarCheckboxItem, MenubarRadioItem (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuViewport, NavigationMenuIndicator

### Community 28 - "Community 28"
Cohesion: 0.67
Nodes (2): ScrollArea, ScrollBar

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (33): SheetOverlay, sheetVariants, SheetContentProps, SheetContent, SheetTitle, SheetDescription, SidebarContext, SidebarProvider (+25 more)

### Community 29 - "Community 29"
Cohesion: 0.67
Nodes (1): ToasterProps

### Community 16 - "Community 16"
Cohesion: 0.22
Nodes (8): Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption

### Community 26 - "Community 26"
Cohesion: 0.50
Nodes (3): TabsList, TabsTrigger, TabsContent

### Community 30 - "Community 30"
Cohesion: 0.67
Nodes (2): TextareaProps, Textarea

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (23): ToastViewport, toastVariants, Toast, ToastAction, ToastClose, ToastTitle, ToastDescription, ToastProps (+15 more)

### Community 20 - "Community 20"
Cohesion: 0.33
Nodes (5): ToggleGroupContext, ToggleGroup, ToggleGroupItem, toggleVariants, Toggle

## Knowledge Gaps
- **203 isolated node(s):** `urlsToCache`, `queryClient`, `Product`, `ProductInsert`, `BillProduct` (+198 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 21`** (1 nodes): `queryClient`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `ScrollArea`, `ScrollBar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `ToasterProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `TextareaProps`, `Textarea`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 6` to `Community 23`, `Community 7`, `Community 2`, `Community 24`, `Community 25`, `Community 17`, `Community 9`, `Community 11`, `Community 5`, `Community 13`, `Community 18`, `Community 14`, `Community 8`, `Community 22`, `Community 10`, `Community 19`, `Community 12`, `Community 15`, `Community 27`, `Community 28`, `Community 3`, `Community 1`, `Community 16`, `Community 26`, `Community 30`, `Community 4`, `Community 20`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `Button` connect `Community 2` to `Community 7`, `Community 3`, `Community 0`, `Community 9`, `Community 1`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `Input` connect `Community 2` to `Community 7`, `Community 3`, `Community 0`, `Community 1`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `urlsToCache`, `queryClient`, `Product` to the rest of the system?**
  _203 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08994708994708994 - nodes in this community are weakly interconnected._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13548387096774195 - nodes in this community are weakly interconnected._