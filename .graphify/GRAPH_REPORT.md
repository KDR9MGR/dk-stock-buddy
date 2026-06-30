# Graph Report - .  (2026-06-30)

## Corpus Check
- 104 files · ~96,969 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 425 nodes · 824 edges · 31 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: contains: 321 · imports: 169 · imports_from: 129 · MODIFIES: 123 · ON_BRANCH: 28 · calls: 27 · PARENT_OF: 27


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 104 · Candidates: 289
- Excluded: 0 untracked · 0 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `741db11`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `cn()` - 45 edges
2. `Button` - 11 edges
3. `Card` - 9 edges
4. `CardContent` - 9 edges
5. `Input` - 9 edges
6. `supabase` - 9 edges
7. `createInvoicePdfFile()` - 9 edges
8. `CardHeader` - 8 edges
9. `CardTitle` - 8 edges
10. `useToast()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `1305b9d Improve invoice PDF design` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 2 → community 0_
- `4b50eb2 Use tech stack vite_react_shadcn_ts_20250728_minor` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 11 → community 0_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (46): main, 1b246a8 feat: implement PWA support and Supabase integration, 31cd1bb Resolve React hook error and align config, 3ba1880 Simplify invoice entry layout, 4486000 fix product add, 5244ada Implement Supabase integration, 55a4319 Add brands and fix search, 6757b57 Fix: Supabase setup and visibility (+38 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (33): useIsMobile(), Separator, SheetContent, SheetContentProps, SheetDescription, SheetOverlay, SheetTitle, sheetVariants (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (26): 1305b9d Improve invoice PDF design, 71e9968 Add invoice PDF and product extraction flow, cea22bb Refine invoice form flow, BillData, BillProduct, BillProductWithPrice, Bills(), ExtractedProductDetails (+18 more)

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (22): BillData, Product, Product, LoginScreen(), LoginScreenProps, AlertDialogAction, AlertDialogCancel, AlertDialogContent (+14 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (23): Action, ActionType, actionTypes, addToRemoveQueue(), dispatch(), genId(), listeners, memoryState (+15 more)

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (9): cn(), CalendarProps, Checkbox, HoverCardContent, PopoverContent, Progress, Slider, Switch (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (12): Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (14): Product, ProductInsert, TablesInsert, Alert, AlertDescription, AlertTitle, alertVariants, SelectContent (+6 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.17
Nodes (10): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarSubContent (+2 more)

### Community 11 - "Community 11"
Cohesion: 0.18
Nodes (3): 4b50eb2 Use tech stack vite_react_shadcn_ts_20250728_minor, Skeleton(), ToasterProps

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 13 - "Community 13"
Cohesion: 0.38
Nodes (9): authStorage, getActiveStorage(), getInactiveStorage(), getRememberedStoragePreference(), getRememberLoginPreference(), hasWindow(), moveSupabaseSessionEntries(), setRememberLoginPreference() (+1 more)

### Community 14 - "Community 14"
Cohesion: 0.20
Nodes (4): ButtonProps, PaginationContent, PaginationItem, PaginationLinkProps

### Community 15 - "Community 15"
Cohesion: 0.20
Nodes (8): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSubContent, ContextMenuSubTrigger

### Community 16 - "Community 16"
Cohesion: 0.20
Nodes (8): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger

### Community 17 - "Community 17"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 18 - "Community 18"
Cohesion: 0.25
Nodes (5): Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage

### Community 19 - "Community 19"
Cohesion: 0.25
Nodes (4): DrawerContent, DrawerDescription, DrawerOverlay, DrawerTitle

### Community 20 - "Community 20"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 21 - "Community 21"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 22 - "Community 22"
Cohesion: 0.33
Nodes (1): queryClient

### Community 23 - "Community 23"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 24 - "Community 24"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

### Community 25 - "Community 25"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 26 - "Community 26"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 27 - "Community 27"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 28 - "Community 28"
Cohesion: 0.67
Nodes (2): RadioGroup, RadioGroupItem

### Community 30 - "Community 30"
Cohesion: 0.67
Nodes (2): ScrollArea, ScrollBar

### Community 31 - "Community 31"
Cohesion: 0.67
Nodes (2): Textarea, TextareaProps

## Knowledge Gaps
- **202 isolated node(s):** `urlsToCache`, `queryClient`, `Product`, `ProductInsert`, `Product` (+197 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 22`** (1 nodes): `queryClient`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `RadioGroup`, `RadioGroupItem`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `ScrollArea`, `ScrollBar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (2 nodes): `Textarea`, `TextareaProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 5` to `Community 24`, `Community 7`, `Community 3`, `Community 25`, `Community 26`, `Community 18`, `Community 9`, `Community 12`, `Community 6`, `Community 15`, `Community 19`, `Community 16`, `Community 8`, `Community 23`, `Community 10`, `Community 20`, `Community 14`, `Community 28`, `Community 29`, `Community 30`, `Community 1`, `Community 11`, `Community 17`, `Community 27`, `Community 31`, `Community 4`, `Community 21`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `Button` connect `Community 3` to `Community 7`, `Community 2`, `Community 0`, `Community 9`, `Community 1`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `urlsToCache`, `queryClient`, `Product` to the rest of the system?**
  _202 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05384615384615385 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08888888888888889 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.14022988505747128 - nodes in this community are weakly interconnected._