# Node Description Batch 2 of 10

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

- "ui_navigation_menu": "navigation-menu.tsx" | kind=code-symbol | source=components/ui/navigation-menu.tsx:L1 | neighbors=[utils.ts, cn(), NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList]
- "ui_toaster": "toaster.tsx" | kind=code-symbol | source=components/ui/toaster.tsx:L1 | neighbors=[use-toast.ts, useToast(), toast.tsx, Toast, ToastClose, ToastDescription]
- "hooks_use_toast_usetoast": "useToast()" | kind=code-symbol | source=hooks/use-toast.ts:L171 | neighbors=[AddStock.tsx, BundleManagement.tsx, LoginScreen.tsx, ProductManagement.tsx, SearchScreen.tsx, use-toast.ts]
- "ui_card_cardheader": "CardHeader" | kind=code-symbol | source=components/ui/card.tsx:L20 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx]
- "ui_card_cardtitle": "CardTitle" | kind=code-symbol | source=components/ui/card.tsx:L32 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, BundleManagement.tsx, Dashboard.tsx, LoginScreen.tsx]
- "lib_invoicepdf": "invoicePdf.ts" | kind=code-symbol | source=lib/invoicePdf.ts:L1 | neighbors=[Bills.tsx, createInvoicePdfFile(), downloadInvoicePdf(), InvoicePdfData, InvoiceProduct, money()]
- "ui_alert": "alert.tsx" | kind=code-symbol | source=components/ui/alert.tsx:L1 | neighbors=[AddStock.tsx, utils.ts, cn(), Alert, AlertDescription, AlertTitle]
- "ui_toggle_group": "toggle-group.tsx" | kind=code-symbol | source=components/ui/toggle-group.tsx:L1 | neighbors=[utils.ts, cn(), toggle.tsx, ToggleGroup, ToggleGroupContext, ToggleGroupItem]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=components/ui/badge.tsx:L1 | neighbors=[BundleManagement.tsx, utils.ts, cn(), Badge(), BadgeProps, badgeVariants]
- "ui_calendar": "calendar.tsx" | kind=code-symbol | source=components/ui/calendar.tsx:L1 | neighbors=[utils.ts, cn(), button.tsx, buttonVariants, Calendar(), CalendarProps]
- "ui_input_otp": "input-otp.tsx" | kind=code-symbol | source=components/ui/input-otp.tsx:L1 | neighbors=[utils.ts, cn(), InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot]
- "ui_label_label": "Label" | kind=code-symbol | source=components/ui/label.tsx:L11 | neighbors=[AddStock.tsx, Bills.tsx, BillsTest.tsx, ProductManagement.tsx, form.tsx, label.tsx]
- "ui_separator": "separator.tsx" | kind=code-symbol | source=components/ui/separator.tsx:L1 | neighbors=[Bills.tsx, BillsTest.tsx, utils.ts, cn(), Separator, sidebar.tsx]
- "app": "App.tsx" | kind=code-symbol | source=App.tsx:L1 | neighbors=[App(), queryClient, Index.tsx, NotFound.tsx, main.tsx]
- "ui_accordion": "accordion.tsx" | kind=code-symbol | source=components/ui/accordion.tsx:L1 | neighbors=[utils.ts, cn(), AccordionContent, AccordionItem, AccordionTrigger]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=components/ui/avatar.tsx:L1 | neighbors=[utils.ts, cn(), Avatar, AvatarFallback, AvatarImage]
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=components/ui/tabs.tsx:L1 | neighbors=[utils.ts, cn(), TabsContent, TabsList, TabsTrigger]
- "ui_toggle": "toggle.tsx" | kind=code-symbol | source=components/ui/toggle.tsx:L1 | neighbors=[utils.ts, cn(), Toggle, toggleVariants, toggle-group.tsx]
- "hooks_use_toast_toast": "Toast" | kind=code-symbol | source=hooks/use-toast.ts:L140 | neighbors=[use-toast.ts, dispatch(), genId(), use-toast.ts]
- "lib_invoicepdf_createinvoicepdffile": "createInvoicePdfFile()" | kind=code-symbol | source=lib/invoicePdf.ts:L35 | neighbors=[Bills.tsx, invoicePdf.ts, money(), downloadInvoicePdf()]
- "supabase_types_tables": "Tables" | kind=code-symbol | source=integrations/supabase/types.ts:L112 | neighbors=[AddStock.tsx, Dashboard.tsx, SearchScreen.tsx, types.ts]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=components/ui/button.tsx:L7 | neighbors=[alert-dialog.tsx, button.tsx, calendar.tsx, pagination.tsx]
- "ui_radio_group": "radio-group.tsx" | kind=code-symbol | source=components/ui/radio-group.tsx:L1 | neighbors=[utils.ts, cn(), RadioGroup, RadioGroupItem]
- "ui_resizable": "resizable.tsx" | kind=code-symbol | source=components/ui/resizable.tsx:L1 | neighbors=[utils.ts, cn(), ResizableHandle(), ResizablePanelGroup()]
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=components/ui/scroll-area.tsx:L1 | neighbors=[utils.ts, cn(), ScrollArea, ScrollBar]
- "ui_separator_separator": "Separator" | kind=code-symbol | source=components/ui/separator.tsx:L6 | neighbors=[Bills.tsx, BillsTest.tsx, separator.tsx, sidebar.tsx]
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=components/ui/skeleton.tsx:L1 | neighbors=[sidebar.tsx, utils.ts, cn(), Skeleton()]
- "ui_switch": "switch.tsx" | kind=code-symbol | source=components/ui/switch.tsx:L1 | neighbors=[Bills.tsx, utils.ts, cn(), Switch]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=components/ui/textarea.tsx:L1 | neighbors=[utils.ts, cn(), Textarea, TextareaProps]
- "ui_tooltip": "tooltip.tsx" | kind=code-symbol | source=components/ui/tooltip.tsx:L1 | neighbors=[sidebar.tsx, utils.ts, cn(), TooltipContent]
- "components_bottomnav": "BottomNav.tsx" | kind=code-symbol | source=components/BottomNav.tsx:L1 | neighbors=[BottomNav(), BottomNavProps, Index.tsx]
- "hooks_use_toast_dispatch": "dispatch()" | kind=code-symbol | source=hooks/use-toast.ts:L133 | neighbors=[use-toast.ts, reducer(), Toast]
- "hooks_use_toast_reducer": "reducer()" | kind=code-symbol | source=hooks/use-toast.ts:L74 | neighbors=[use-toast.ts, dispatch(), addToRemoveQueue()]
- "lib_invoicepdf_downloadinvoicepdf": "downloadInvoicePdf()" | kind=code-symbol | source=lib/invoicePdf.ts:L142 | neighbors=[Bills.tsx, invoicePdf.ts, createInvoicePdfFile()]
- "supabase_types_database": "Database" | kind=code-symbol | source=integrations/supabase/types.ts:L9 | neighbors=[Bills.tsx, client.ts, types.ts]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=components/ui/badge.tsx:L30 | neighbors=[BundleManagement.tsx, badge.tsx, badgeVariants]
- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=components/ui/checkbox.tsx:L1 | neighbors=[utils.ts, cn(), Checkbox]
- "ui_hover_card": "hover-card.tsx" | kind=code-symbol | source=components/ui/hover-card.tsx:L1 | neighbors=[utils.ts, cn(), HoverCardContent]
- "ui_popover": "popover.tsx" | kind=code-symbol | source=components/ui/popover.tsx:L1 | neighbors=[utils.ts, cn(), PopoverContent]
- "ui_progress": "progress.tsx" | kind=code-symbol | source=components/ui/progress.tsx:L1 | neighbors=[utils.ts, cn(), Progress]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-001.json

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
