# Node Description Batch 8 of 10

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

- "ui_menubar_menubarsubcontent": "MenubarSubContent" | kind=code-symbol | source=components/ui/menubar.tsx:L68 | neighbors=[menubar.tsx]
- "ui_menubar_menubarsubtrigger": "MenubarSubTrigger" | kind=code-symbol | source=components/ui/menubar.tsx:L47 | neighbors=[menubar.tsx]
- "ui_menubar_menubartrigger": "MenubarTrigger" | kind=code-symbol | source=components/ui/menubar.tsx:L32 | neighbors=[menubar.tsx]
- "ui_navigation_menu_navigationmenu": "NavigationMenu" | kind=code-symbol | source=components/ui/navigation-menu.tsx:L8 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenucontent": "NavigationMenuContent" | kind=code-symbol | source=components/ui/navigation-menu.tsx:L65 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenuindicator": "NavigationMenuIndicator" | kind=code-symbol | source=components/ui/navigation-menu.tsx:L100 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenulist": "NavigationMenuList" | kind=code-symbol | source=components/ui/navigation-menu.tsx:L26 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenutrigger": "NavigationMenuTrigger" | kind=code-symbol | source=components/ui/navigation-menu.tsx:L47 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenutriggerstyle": "navigationMenuTriggerStyle" | kind=code-symbol | source=components/ui/navigation-menu.tsx:L43 | neighbors=[navigation-menu.tsx]
- "ui_navigation_menu_navigationmenuviewport": "NavigationMenuViewport" | kind=code-symbol | source=components/ui/navigation-menu.tsx:L82 | neighbors=[navigation-menu.tsx]
- "ui_pagination_pagination": "Pagination()" | kind=code-symbol | source=components/ui/pagination.tsx:L7 | neighbors=[pagination.tsx]
- "ui_pagination_paginationcontent": "PaginationContent" | kind=code-symbol | source=components/ui/pagination.tsx:L17 | neighbors=[pagination.tsx]
- "ui_pagination_paginationellipsis": "PaginationEllipsis()" | kind=code-symbol | source=components/ui/pagination.tsx:L94 | neighbors=[pagination.tsx]
- "ui_pagination_paginationitem": "PaginationItem" | kind=code-symbol | source=components/ui/pagination.tsx:L29 | neighbors=[pagination.tsx]
- "ui_pagination_paginationlink": "PaginationLink()" | kind=code-symbol | source=components/ui/pagination.tsx:L42 | neighbors=[pagination.tsx]
- "ui_pagination_paginationlinkprops": "PaginationLinkProps" | kind=code-symbol | source=components/ui/pagination.tsx:L37 | neighbors=[pagination.tsx]
- "ui_pagination_paginationnext": "PaginationNext()" | kind=code-symbol | source=components/ui/pagination.tsx:L78 | neighbors=[pagination.tsx]
- "ui_pagination_paginationprevious": "PaginationPrevious()" | kind=code-symbol | source=components/ui/pagination.tsx:L62 | neighbors=[pagination.tsx]
- "ui_popover_popovercontent": "PopoverContent" | kind=code-symbol | source=components/ui/popover.tsx:L10 | neighbors=[popover.tsx]
- "ui_progress_progress": "Progress" | kind=code-symbol | source=components/ui/progress.tsx:L6 | neighbors=[progress.tsx]
- "ui_radio_group_radiogroup": "RadioGroup" | kind=code-symbol | source=components/ui/radio-group.tsx:L7 | neighbors=[radio-group.tsx]
- "ui_radio_group_radiogroupitem": "RadioGroupItem" | kind=code-symbol | source=components/ui/radio-group.tsx:L21 | neighbors=[radio-group.tsx]
- "ui_resizable_resizablehandle": "ResizableHandle()" | kind=code-symbol | source=components/ui/resizable.tsx:L21 | neighbors=[resizable.tsx]
- "ui_resizable_resizablepanelgroup": "ResizablePanelGroup()" | kind=code-symbol | source=components/ui/resizable.tsx:L6 | neighbors=[resizable.tsx]
- "ui_scroll_area_scrollarea": "ScrollArea" | kind=code-symbol | source=components/ui/scroll-area.tsx:L6 | neighbors=[scroll-area.tsx]
- "ui_scroll_area_scrollbar": "ScrollBar" | kind=code-symbol | source=components/ui/scroll-area.tsx:L24 | neighbors=[scroll-area.tsx]
- "ui_select_selectlabel": "SelectLabel" | kind=code-symbol | source=components/ui/select.tsx:L100 | neighbors=[select.tsx]
- "ui_select_selectscrolldownbutton": "SelectScrollDownButton" | kind=code-symbol | source=components/ui/select.tsx:L50 | neighbors=[select.tsx]
- "ui_select_selectscrollupbutton": "SelectScrollUpButton" | kind=code-symbol | source=components/ui/select.tsx:L33 | neighbors=[select.tsx]
- "ui_select_selectseparator": "SelectSeparator" | kind=code-symbol | source=components/ui/select.tsx:L135 | neighbors=[select.tsx]
- "ui_sheet_sheetcontentprops": "SheetContentProps" | kind=code-symbol | source=components/ui/sheet.tsx:L50 | neighbors=[sheet.tsx]
- "ui_sheet_sheetdescription": "SheetDescription" | kind=code-symbol | source=components/ui/sheet.tsx:L115 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=components/ui/sheet.tsx:L89 | neighbors=[sheet.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=components/ui/sheet.tsx:L75 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay" | kind=code-symbol | source=components/ui/sheet.tsx:L16 | neighbors=[sheet.tsx]
- "ui_sheet_sheettitle": "SheetTitle" | kind=code-symbol | source=components/ui/sheet.tsx:L103 | neighbors=[sheet.tsx]
- "ui_sheet_sheetvariants": "sheetVariants" | kind=code-symbol | source=components/ui/sheet.tsx:L31 | neighbors=[sheet.tsx]
- "ui_sidebar_sidebar": "Sidebar" | kind=code-symbol | source=components/ui/sidebar.tsx:L157 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontent": "SidebarContent" | kind=code-symbol | source=components/ui/sidebar.tsx:L396 | neighbors=[sidebar.tsx]
- "ui_sidebar_sidebarcontext": "SidebarContext" | kind=code-symbol | source=components/ui/sidebar.tsx:L27 | neighbors=[sidebar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-007.json

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
