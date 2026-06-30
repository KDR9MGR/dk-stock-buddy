# Node Description Batch 4 of 10

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

- "ui_toast_toastdescription": "ToastDescription" | kind=code-symbol | source=components/ui/toast.tsx:L101 | neighbors=[toast.tsx, toaster.tsx]
- "ui_toast_toastprops": "ToastProps" | kind=code-symbol | source=components/ui/toast.tsx:L113 | neighbors=[use-toast.ts, toast.tsx]
- "ui_toast_toasttitle": "ToastTitle" | kind=code-symbol | source=components/ui/toast.tsx:L89 | neighbors=[toast.tsx, toaster.tsx]
- "ui_toast_toastviewport": "ToastViewport" | kind=code-symbol | source=components/ui/toast.tsx:L10 | neighbors=[toast.tsx, toaster.tsx]
- "ui_toggle_togglevariants": "toggleVariants" | kind=code-symbol | source=components/ui/toggle.tsx:L7 | neighbors=[toggle.tsx, toggle-group.tsx]
- "ui_tooltip_tooltipcontent": "TooltipContent" | kind=code-symbol | source=components/ui/tooltip.tsx:L12 | neighbors=[sidebar.tsx, tooltip.tsx]
- "app_app": "App()" | kind=code-symbol | source=App.tsx:L11 | neighbors=[App.tsx]
- "app_queryclient": "queryClient" | kind=code-symbol | source=App.tsx:L9 | neighbors=[App.tsx]
- "components_addstock_product": "Product" | kind=code-symbol | source=components/AddStock.tsx:L13 | neighbors=[AddStock.tsx]
- "components_addstock_productinsert": "ProductInsert" | kind=code-symbol | source=components/AddStock.tsx:L14 | neighbors=[AddStock.tsx]
- "components_bills_billdata": "BillData" | kind=code-symbol | source=components/Bills.tsx:L31 | neighbors=[Bills.tsx]
- "components_bills_billproduct": "BillProduct" | kind=code-symbol | source=components/Bills.tsx:L15 | neighbors=[Bills.tsx]
- "components_bills_billproductwithprice": "BillProductWithPrice" | kind=code-symbol | source=components/Bills.tsx:L16 | neighbors=[Bills.tsx]
- "components_bills_createemptyproduct": "createEmptyProduct()" | kind=code-symbol | source=components/Bills.tsx:L53 | neighbors=[Bills.tsx]
- "components_bills_createid": "createId()" | kind=code-symbol | source=components/Bills.tsx:L63 | neighbors=[Bills.tsx]
- "components_bills_extractedproductdetails": "ExtractedProductDetails" | kind=code-symbol | source=components/Bills.tsx:L45 | neighbors=[Bills.tsx]
- "components_bills_newproduct": "NewProduct" | kind=code-symbol | source=components/Bills.tsx:L29 | neighbors=[Bills.tsx]
- "components_bills_product": "Product" | kind=code-symbol | source=components/Bills.tsx:L18 | neighbors=[Bills.tsx]
- "components_bills_productphoto": "ProductPhoto" | kind=code-symbol | source=components/Bills.tsx:L39 | neighbors=[Bills.tsx]
- "components_billstest_billdata": "BillData" | kind=code-symbol | source=components/BillsTest.tsx:L17 | neighbors=[BillsTest.tsx]
- "components_billstest_billstest": "BillsTest()" | kind=code-symbol | source=components/BillsTest.tsx:L23 | neighbors=[BillsTest.tsx]
- "components_billstest_product": "Product" | kind=code-symbol | source=components/BillsTest.tsx:L9 | neighbors=[BillsTest.tsx]
- "components_bottomnav_bottomnavprops": "BottomNavProps" | kind=code-symbol | source=components/BottomNav.tsx:L3 | neighbors=[BottomNav.tsx]
- "components_bundlemanagement_product": "Product" | kind=code-symbol | source=components/BundleManagement.tsx:L26 | neighbors=[BundleManagement.tsx]
- "components_dashboard_dashboardprops": "DashboardProps" | kind=code-symbol | source=components/Dashboard.tsx:L19 | neighbors=[Dashboard.tsx]
- "components_dashboard_dashboardstats": "DashboardStats" | kind=code-symbol | source=components/Dashboard.tsx:L10 | neighbors=[Dashboard.tsx]
- "components_dashboard_product": "Product" | kind=code-symbol | source=components/Dashboard.tsx:L8 | neighbors=[Dashboard.tsx]
- "components_loginscreen_loginscreenprops": "LoginScreenProps" | kind=code-symbol | source=components/LoginScreen.tsx:L8 | neighbors=[LoginScreen.tsx]
- "components_productmanagement_productmanagementprops": "ProductManagementProps" | kind=code-symbol | source=components/ProductManagement.tsx:L11 | neighbors=[ProductManagement.tsx]
- "components_searchscreen_product": "Product" | kind=code-symbol | source=components/SearchScreen.tsx:L10 | neighbors=[SearchScreen.tsx]
- "hooks_use_toast_action": "Action" | kind=code-symbol | source=hooks/use-toast.ts:L34 | neighbors=[use-toast.ts]
- "hooks_use_toast_actiontype": "ActionType" | kind=code-symbol | source=hooks/use-toast.ts:L32 | neighbors=[use-toast.ts]
- "hooks_use_toast_actiontypes": "actionTypes" | kind=code-symbol | source=hooks/use-toast.ts:L18 | neighbors=[use-toast.ts]
- "hooks_use_toast_listeners": "listeners" | kind=code-symbol | source=hooks/use-toast.ts:L129 | neighbors=[use-toast.ts]
- "hooks_use_toast_memorystate": "memoryState" | kind=code-symbol | source=hooks/use-toast.ts:L131 | neighbors=[use-toast.ts]
- "hooks_use_toast_state": "State" | kind=code-symbol | source=hooks/use-toast.ts:L52 | neighbors=[use-toast.ts]
- "hooks_use_toast_toastertoast": "ToasterToast" | kind=code-symbol | source=hooks/use-toast.ts:L11 | neighbors=[use-toast.ts]
- "hooks_use_toast_toasttimeouts": "toastTimeouts" | kind=code-symbol | source=hooks/use-toast.ts:L56 | neighbors=[use-toast.ts]
- "lib_invoicepdf_invoicepdfdata": "InvoicePdfData" | kind=code-symbol | source=lib/invoicePdf.ts:L13 | neighbors=[invoicePdf.ts]
- "lib_invoicepdf_invoiceproduct": "InvoiceProduct" | kind=code-symbol | source=lib/invoicePdf.ts:L3 | neighbors=[invoicePdf.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-003.json

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
