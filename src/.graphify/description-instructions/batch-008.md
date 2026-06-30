# Node Description Batch 9 of 10

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

- "ui_sidebar_sidebarfooter": "SidebarFooter" | kind=code-symbol | source=components/ui/sidebar.tsx:L366 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroup": "SidebarGroup" | kind=code-symbol | source=components/ui/sidebar.tsx:L414 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupaction": "SidebarGroupAction" | kind=code-symbol | source=components/ui/sidebar.tsx:L450 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargroupcontent": "SidebarGroupContent" | kind=code-symbol | source=components/ui/sidebar.tsx:L473 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebargrouplabel": "SidebarGroupLabel" | kind=code-symbol | source=components/ui/sidebar.tsx:L429 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarheader": "SidebarHeader" | kind=code-symbol | source=components/ui/sidebar.tsx:L351 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarinput": "SidebarInput" | kind=code-symbol | source=components/ui/sidebar.tsx:L333 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarinset": "SidebarInset" | kind=code-symbol | source=components/ui/sidebar.tsx:L315 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenu": "SidebarMenu" | kind=code-symbol | source=components/ui/sidebar.tsx:L486 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuaction": "SidebarMenuAction" | kind=code-symbol | source=components/ui/sidebar.tsx:L593 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenubadge": "SidebarMenuBadge" | kind=code-symbol | source=components/ui/sidebar.tsx:L624 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenubutton": "SidebarMenuButton" | kind=code-symbol | source=components/ui/sidebar.tsx:L534 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenubuttonvariants": "sidebarMenuButtonVariants" | kind=code-symbol | source=components/ui/sidebar.tsx:L512 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuitem": "SidebarMenuItem" | kind=code-symbol | source=components/ui/sidebar.tsx:L499 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenuskeleton": "SidebarMenuSkeleton" | kind=code-symbol | source=components/ui/sidebar.tsx:L645 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenusub": "SidebarMenuSub" | kind=code-symbol | source=components/ui/sidebar.tsx:L683 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenusubbutton": "SidebarMenuSubButton" | kind=code-symbol | source=components/ui/sidebar.tsx:L706 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarmenusubitem": "SidebarMenuSubItem" | kind=code-symbol | source=components/ui/sidebar.tsx:L700 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarprovider": "SidebarProvider" | kind=code-symbol | source=components/ui/sidebar.tsx:L48 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarrail": "SidebarRail" | kind=code-symbol | source=components/ui/sidebar.tsx:L286 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarseparator": "SidebarSeparator" | kind=code-symbol | source=components/ui/sidebar.tsx:L381 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebartrigger": "SidebarTrigger" | kind=code-symbol | source=components/ui/sidebar.tsx:L260 | neighbors=[sidebar.tsx]
- "ui_sidebar_usesidebar": "useSidebar()" | kind=code-symbol | source=components/ui/sidebar.tsx:L39 | neighbors=[sidebar.tsx]
- "ui_slider_slider": "Slider" | kind=code-symbol | source=components/ui/slider.tsx:L6 | neighbors=[slider.tsx]
- "ui_sonner_toaster": "Toaster()" | kind=code-symbol | source=components/ui/sonner.tsx:L6 | neighbors=[sonner.tsx]
- "ui_sonner_toasterprops": "ToasterProps" | kind=code-symbol | source=components/ui/sonner.tsx:L4 | neighbors=[sonner.tsx]
- "ui_table_table": "Table" | kind=code-symbol | source=components/ui/table.tsx:L5 | neighbors=[table.tsx]
- "ui_table_tablebody": "TableBody" | kind=code-symbol | source=components/ui/table.tsx:L27 | neighbors=[table.tsx]
- "ui_table_tablecaption": "TableCaption" | kind=code-symbol | source=components/ui/table.tsx:L96 | neighbors=[table.tsx]
- "ui_table_tablecell": "TableCell" | kind=code-symbol | source=components/ui/table.tsx:L84 | neighbors=[table.tsx]
- "ui_table_tablefooter": "TableFooter" | kind=code-symbol | source=components/ui/table.tsx:L39 | neighbors=[table.tsx]
- "ui_table_tablehead": "TableHead" | kind=code-symbol | source=components/ui/table.tsx:L69 | neighbors=[table.tsx]
- "ui_table_tableheader": "TableHeader" | kind=code-symbol | source=components/ui/table.tsx:L19 | neighbors=[table.tsx]
- "ui_table_tablerow": "TableRow" | kind=code-symbol | source=components/ui/table.tsx:L54 | neighbors=[table.tsx]
- "ui_tabs_tabscontent": "TabsContent" | kind=code-symbol | source=components/ui/tabs.tsx:L38 | neighbors=[tabs.tsx]
- "ui_tabs_tabslist": "TabsList" | kind=code-symbol | source=components/ui/tabs.tsx:L8 | neighbors=[tabs.tsx]
- "ui_tabs_tabstrigger": "TabsTrigger" | kind=code-symbol | source=components/ui/tabs.tsx:L23 | neighbors=[tabs.tsx]
- "ui_textarea_textarea": "Textarea" | kind=code-symbol | source=components/ui/textarea.tsx:L7 | neighbors=[textarea.tsx]
- "ui_textarea_textareaprops": "TextareaProps" | kind=code-symbol | source=components/ui/textarea.tsx:L5 | neighbors=[textarea.tsx]
- "ui_toast_toastaction": "ToastAction" | kind=code-symbol | source=components/ui/toast.tsx:L56 | neighbors=[toast.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-008.json

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
