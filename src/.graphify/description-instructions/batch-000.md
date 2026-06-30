# Node Description Batch 1 of 10

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "lib_utils": "utils.ts" | kind=code-symbol | source=lib/utils.ts:L1 | neighbors=[cn(), accordion.tsx, alert.tsx, alert-dialog.tsx, avatar.tsx, badge.tsx]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=lib/utils.ts:L4 | neighbors=[utils.ts, accordion.tsx, alert.tsx, alert-dialog.tsx, avatar.tsx, badge.tsx]
- "ui_sidebar": "sidebar.tsx" | kind=code-symbol | source=components/ui/sidebar.tsx:L1 | neighbors=[use-mobile.tsx, useIsMobile(), utils.ts, cn(), button.tsx, Button]
- "components_bills": "Bills.tsx" | kind=code-symbol | source=components/Bills.tsx:L1 | neighbors=[BillData, BillProduct, BillProductWithPrice, Bills(), createEmptyProduct(), createId()]
- "components_addstock": "AddStock.tsx" | kind=code-symbol | source=components/AddStock.tsx:L1 | neighbors=[AddStock(), Product, ProductInsert, use-toast.ts, useToast(), client.ts]
- "components_bundlemanagement": "BundleManagement.tsx" | kind=code-symbol | source=components/BundleManagement.tsx:L1 | neighbors=[BundleManagement(), Product, use-toast.ts, useToast(), client.ts, supabase]
- "hooks_use_toast": "use-toast.ts" | kind=code-symbol | source=hooks/use-toast.ts:L1 | neighbors=[AddStock.tsx, BundleManagement.tsx, LoginScreen.tsx, ProductManagement.tsx, SearchScreen.tsx, Action]
- "pages_index": "Index.tsx" | kind=code-symbol | source=pages/Index.tsx:L1 | neighbors=[App.tsx, AddStock.tsx, AddStock(), Bills.tsx, Bills(), BottomNav.tsx]
- "components_productmanagement": "ProductManagement.tsx" | kind=code-symbol | source=components/ProductManagement.tsx:L1 | neighbors=[ProductManagement(), ProductManagementProps, use-toast.ts, useToast(), client.ts, supabase]
- "ui_button": "button.tsx" | kind=code-symbol | source=components/ui/button.tsx:L1 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx]
- "ui_carousel": "carousel.tsx" | kind=code-symbol | source=components/ui/carousel.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, Button, Carousel, CarouselApi]
- "components_billstest": "BillsTest.tsx" | kind=code-symbol | source=components/BillsTest.tsx:L1 | neighbors=[BillData, BillsTest(), Product, button.tsx, Button, card.tsx]
- "components_dashboard": "Dashboard.tsx" | kind=code-symbol | source=components/Dashboard.tsx:L1 | neighbors=[Dashboard(), DashboardProps, DashboardStats, Product, client.ts, supabase]
- "components_loginscreen": "LoginScreen.tsx" | kind=code-symbol | source=components/LoginScreen.tsx:L1 | neighbors=[LoginScreen(), LoginScreenProps, use-toast.ts, useToast(), client.ts, supabase]
- "components_searchscreen": "SearchScreen.tsx" | kind=code-symbol | source=components/SearchScreen.tsx:L1 | neighbors=[Product, SearchScreen(), use-toast.ts, useToast(), client.ts, supabase]
- "ui_card": "card.tsx" | kind=code-symbol | source=components/ui/card.tsx:L1 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx]
- "supabase_types": "types.ts" | kind=code-symbol | source=integrations/supabase/types.ts:L1 | neighbors=[AddStock.tsx, Bills.tsx, Dashboard.tsx, SearchScreen.tsx, client.ts, CompositeTypes]
- "ui_form": "form.tsx" | kind=code-symbol | source=components/ui/form.tsx:L1 | neighbors=[utils.ts, cn(), FormControl, FormDescription, FormField(), FormFieldContext]
- "ui_command": "command.tsx" | kind=code-symbol | source=components/ui/command.tsx:L1 | neighbors=[utils.ts, cn(), Command, CommandDialog(), CommandDialogProps, CommandEmpty]
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L1 | neighbors=[BundleManagement.tsx, utils.ts, cn(), AlertDialogAction, AlertDialogCancel, AlertDialogContent]
- "ui_menubar": "menubar.tsx" | kind=code-symbol | source=components/ui/menubar.tsx:L1 | neighbors=[utils.ts, cn(), Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem]
- "ui_pagination": "pagination.tsx" | kind=code-symbol | source=components/ui/pagination.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, ButtonProps, buttonVariants, Pagination()]
- "ui_toast": "toast.tsx" | kind=code-symbol | source=components/ui/toast.tsx:L1 | neighbors=[use-toast.ts, utils.ts, cn(), Toast, ToastAction, ToastActionElement]
- "ui_chart": "chart.tsx" | kind=code-symbol | source=components/ui/chart.tsx:L1 | neighbors=[utils.ts, cn(), ChartConfig, ChartContainer, ChartContext, ChartContextProps]
- "supabase_client": "client.ts" | kind=code-symbol | source=integrations/supabase/client.ts:L1 | neighbors=[AddStock.tsx, Bills.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx, ProductManagement.tsx]
- "ui_button_button": "Button" | kind=code-symbol | source=components/ui/button.tsx:L42 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx]
- "ui_context_menu": "context-menu.tsx" | kind=code-symbol | source=components/ui/context-menu.tsx:L1 | neighbors=[utils.ts, cn(), ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L1 | neighbors=[utils.ts, cn(), DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel]
- "ui_input": "input.tsx" | kind=code-symbol | source=components/ui/input.tsx:L1 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, LoginScreen.tsx, ProductManagement.tsx]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=components/ui/sheet.tsx:L1 | neighbors=[utils.ts, cn(), SheetContent, SheetContentProps, SheetDescription, SheetFooter()]
- "ui_select": "select.tsx" | kind=code-symbol | source=components/ui/select.tsx:L1 | neighbors=[AddStock.tsx, utils.ts, cn(), SelectContent, SelectItem, SelectLabel]
- "ui_table": "table.tsx" | kind=code-symbol | source=components/ui/table.tsx:L1 | neighbors=[utils.ts, cn(), Table, TableBody, TableCaption, TableCell]
- "supabase_client_supabase": "supabase" | kind=code-symbol | source=integrations/supabase/client.ts:L11 | neighbors=[AddStock.tsx, Bills.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx, ProductManagement.tsx]
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=components/ui/breadcrumb.tsx:L1 | neighbors=[utils.ts, cn(), Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink]
- "ui_card_card": "Card" | kind=code-symbol | source=components/ui/card.tsx:L5 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx]
- "ui_card_cardcontent": "CardContent" | kind=code-symbol | source=components/ui/card.tsx:L59 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx]
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=components/ui/dialog.tsx:L1 | neighbors=[command.tsx, utils.ts, cn(), DialogContent, DialogDescription, DialogFooter()]
- "ui_drawer": "drawer.tsx" | kind=code-symbol | source=components/ui/drawer.tsx:L1 | neighbors=[utils.ts, cn(), Drawer(), DrawerContent, DrawerDescription, DrawerFooter()]
- "ui_input_input": "Input" | kind=code-symbol | source=components/ui/input.tsx:L5 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, LoginScreen.tsx, ProductManagement.tsx]
- "ui_label": "label.tsx" | kind=code-symbol | source=components/ui/label.tsx:L1 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, ProductManagement.tsx, form.tsx, utils.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-000.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
