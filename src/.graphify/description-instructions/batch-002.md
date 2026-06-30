# Node Description Batch 3 of 10

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

- "ui_slider": "slider.tsx" | kind=code-symbol | source=components/ui/slider.tsx:L1 | neighbors=[utils.ts, cn(), Slider]
- "ui_use_toast": "use-toast.ts" | kind=code-symbol | source=components/ui/use-toast.ts:L1 | neighbors=[use-toast.ts, Toast, useToast()]
- "components_addstock_addstock": "AddStock()" | kind=code-symbol | source=components/AddStock.tsx:L16 | neighbors=[AddStock.tsx, Index.tsx]
- "components_bills_bills": "Bills()" | kind=code-symbol | source=components/Bills.tsx:L71 | neighbors=[Bills.tsx, Index.tsx]
- "components_bottomnav_bottomnav": "BottomNav()" | kind=code-symbol | source=components/BottomNav.tsx:L8 | neighbors=[BottomNav.tsx, Index.tsx]
- "components_bundlemanagement_bundlemanagement": "BundleManagement()" | kind=code-symbol | source=components/BundleManagement.tsx:L36 | neighbors=[BundleManagement.tsx, Index.tsx]
- "components_dashboard_dashboard": "Dashboard()" | kind=code-symbol | source=components/Dashboard.tsx:L23 | neighbors=[Dashboard.tsx, Index.tsx]
- "components_loginscreen_loginscreen": "LoginScreen()" | kind=code-symbol | source=components/LoginScreen.tsx:L12 | neighbors=[LoginScreen.tsx, Index.tsx]
- "components_productmanagement_productmanagement": "ProductManagement()" | kind=code-symbol | source=components/ProductManagement.tsx:L15 | neighbors=[ProductManagement.tsx, Index.tsx]
- "components_searchscreen_searchscreen": "SearchScreen()" | kind=code-symbol | source=components/SearchScreen.tsx:L12 | neighbors=[SearchScreen.tsx, Index.tsx]
- "hooks_use_mobile": "use-mobile.tsx" | kind=code-symbol | source=hooks/use-mobile.tsx:L1 | neighbors=[useIsMobile(), sidebar.tsx]
- "hooks_use_mobile_useismobile": "useIsMobile()" | kind=code-symbol | source=hooks/use-mobile.tsx:L5 | neighbors=[use-mobile.tsx, sidebar.tsx]
- "hooks_use_toast_addtoremovequeue": "addToRemoveQueue()" | kind=code-symbol | source=hooks/use-toast.ts:L58 | neighbors=[use-toast.ts, reducer()]
- "hooks_use_toast_genid": "genId()" | kind=code-symbol | source=hooks/use-toast.ts:L27 | neighbors=[use-toast.ts, Toast]
- "lib_invoicepdf_money": "money()" | kind=code-symbol | source=lib/invoicePdf.ts:L24 | neighbors=[invoicePdf.ts, createInvoicePdfFile()]
- "pages_notfound": "NotFound.tsx" | kind=code-symbol | source=pages/NotFound.tsx:L1 | neighbors=[App.tsx, NotFound()]
- "supabase_types_tablesinsert": "TablesInsert" | kind=code-symbol | source=integrations/supabase/types.ts:L141 | neighbors=[AddStock.tsx, types.ts]
- "ui_alert_alert": "Alert" | kind=code-symbol | source=components/ui/alert.tsx:L22 | neighbors=[AddStock.tsx, alert.tsx]
- "ui_alert_alertdescription": "AlertDescription" | kind=code-symbol | source=components/ui/alert.tsx:L47 | neighbors=[AddStock.tsx, alert.tsx]
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L99 | neighbors=[BundleManagement.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L111 | neighbors=[BundleManagement.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L28 | neighbors=[BundleManagement.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L86 | neighbors=[BundleManagement.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L60 | neighbors=[BundleManagement.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L46 | neighbors=[BundleManagement.tsx, alert-dialog.tsx]
- "ui_alert_dialog_alertdialogtitle": "AlertDialogTitle" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L74 | neighbors=[BundleManagement.tsx, alert-dialog.tsx]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=components/ui/badge.tsx:L6 | neighbors=[badge.tsx, Badge()]
- "ui_button_buttonprops": "ButtonProps" | kind=code-symbol | source=components/ui/button.tsx:L36 | neighbors=[button.tsx, pagination.tsx]
- "ui_card_carddescription": "CardDescription" | kind=code-symbol | source=components/ui/card.tsx:L47 | neighbors=[BundleManagement.tsx, card.tsx]
- "ui_dialog_dialogcontent": "DialogContent" | kind=code-symbol | source=components/ui/dialog.tsx:L30 | neighbors=[command.tsx, dialog.tsx]
- "ui_select_selectcontent": "SelectContent" | kind=code-symbol | source=components/ui/select.tsx:L68 | neighbors=[AddStock.tsx, select.tsx]
- "ui_select_selectitem": "SelectItem" | kind=code-symbol | source=components/ui/select.tsx:L112 | neighbors=[AddStock.tsx, select.tsx]
- "ui_select_selecttrigger": "SelectTrigger" | kind=code-symbol | source=components/ui/select.tsx:L13 | neighbors=[AddStock.tsx, select.tsx]
- "ui_sheet_sheetcontent": "SheetContent" | kind=code-symbol | source=components/ui/sheet.tsx:L54 | neighbors=[sheet.tsx, sidebar.tsx]
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=components/ui/skeleton.tsx:L3 | neighbors=[sidebar.tsx, skeleton.tsx]
- "ui_sonner": "sonner.tsx" | kind=code-symbol | source=components/ui/sonner.tsx:L1 | neighbors=[Toaster(), ToasterProps]
- "ui_switch_switch": "Switch" | kind=code-symbol | source=components/ui/switch.tsx:L6 | neighbors=[Bills.tsx, switch.tsx]
- "ui_toast_toast": "Toast" | kind=code-symbol | source=components/ui/toast.tsx:L41 | neighbors=[toast.tsx, toaster.tsx]
- "ui_toast_toastactionelement": "ToastActionElement" | kind=code-symbol | source=components/ui/toast.tsx:L115 | neighbors=[use-toast.ts, toast.tsx]
- "ui_toast_toastclose": "ToastClose" | kind=code-symbol | source=components/ui/toast.tsx:L71 | neighbors=[toast.tsx, toaster.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-002.json

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
