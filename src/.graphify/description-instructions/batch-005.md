# Node Description Batch 6 of 10

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

- "ui_carousel_carouselprevious": "CarouselPrevious" | kind=code-symbol | source=components/ui/carousel.tsx:L195 | neighbors=[carousel.tsx]
- "ui_carousel_carouselprops": "CarouselProps" | kind=code-symbol | source=components/ui/carousel.tsx:L15 | neighbors=[carousel.tsx]
- "ui_carousel_usecarousel": "useCarousel()" | kind=code-symbol | source=components/ui/carousel.tsx:L33 | neighbors=[carousel.tsx]
- "ui_carousel_usecarouselparameters": "UseCarouselParameters" | kind=code-symbol | source=components/ui/carousel.tsx:L11 | neighbors=[carousel.tsx]
- "ui_chart_chartconfig": "ChartConfig" | kind=code-symbol | source=components/ui/chart.tsx:L9 | neighbors=[chart.tsx]
- "ui_chart_chartcontainer": "ChartContainer" | kind=code-symbol | source=components/ui/chart.tsx:L35 | neighbors=[chart.tsx]
- "ui_chart_chartcontext": "ChartContext" | kind=code-symbol | source=components/ui/chart.tsx:L23 | neighbors=[chart.tsx]
- "ui_chart_chartcontextprops": "ChartContextProps" | kind=code-symbol | source=components/ui/chart.tsx:L19 | neighbors=[chart.tsx]
- "ui_chart_chartlegendcontent": "ChartLegendContent" | kind=code-symbol | source=components/ui/chart.tsx:L259 | neighbors=[chart.tsx]
- "ui_chart_chartstyle": "ChartStyle()" | kind=code-symbol | source=components/ui/chart.tsx:L68 | neighbors=[chart.tsx]
- "ui_chart_charttooltipcontent": "ChartTooltipContent" | kind=code-symbol | source=components/ui/chart.tsx:L103 | neighbors=[chart.tsx]
- "ui_chart_getpayloadconfigfrompayload": "getPayloadConfigFromPayload()" | kind=code-symbol | source=components/ui/chart.tsx:L318 | neighbors=[chart.tsx]
- "ui_chart_themes": "THEMES" | kind=code-symbol | source=components/ui/chart.tsx:L7 | neighbors=[chart.tsx]
- "ui_chart_usechart": "useChart()" | kind=code-symbol | source=components/ui/chart.tsx:L25 | neighbors=[chart.tsx]
- "ui_checkbox_checkbox": "Checkbox" | kind=code-symbol | source=components/ui/checkbox.tsx:L7 | neighbors=[checkbox.tsx]
- "ui_command_command": "Command" | kind=code-symbol | source=components/ui/command.tsx:L9 | neighbors=[command.tsx]
- "ui_command_commanddialog": "CommandDialog()" | kind=code-symbol | source=components/ui/command.tsx:L26 | neighbors=[command.tsx]
- "ui_command_commanddialogprops": "CommandDialogProps" | kind=code-symbol | source=components/ui/command.tsx:L24 | neighbors=[command.tsx]
- "ui_command_commandempty": "CommandEmpty" | kind=code-symbol | source=components/ui/command.tsx:L70 | neighbors=[command.tsx]
- "ui_command_commandgroup": "CommandGroup" | kind=code-symbol | source=components/ui/command.tsx:L83 | neighbors=[command.tsx]
- "ui_command_commandinput": "CommandInput" | kind=code-symbol | source=components/ui/command.tsx:L38 | neighbors=[command.tsx]
- "ui_command_commanditem": "CommandItem" | kind=code-symbol | source=components/ui/command.tsx:L111 | neighbors=[command.tsx]
- "ui_command_commandlist": "CommandList" | kind=code-symbol | source=components/ui/command.tsx:L57 | neighbors=[command.tsx]
- "ui_command_commandseparator": "CommandSeparator" | kind=code-symbol | source=components/ui/command.tsx:L99 | neighbors=[command.tsx]
- "ui_command_commandshortcut": "CommandShortcut()" | kind=code-symbol | source=components/ui/command.tsx:L127 | neighbors=[command.tsx]
- "ui_context_menu_contextmenucheckboxitem": "ContextMenuCheckboxItem" | kind=code-symbol | source=components/ui/context-menu.tsx:L90 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenucontent": "ContextMenuContent" | kind=code-symbol | source=components/ui/context-menu.tsx:L55 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenuitem": "ContextMenuItem" | kind=code-symbol | source=components/ui/context-menu.tsx:L72 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenulabel": "ContextMenuLabel" | kind=code-symbol | source=components/ui/context-menu.tsx:L136 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenuradioitem": "ContextMenuRadioItem" | kind=code-symbol | source=components/ui/context-menu.tsx:L114 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenuseparator": "ContextMenuSeparator" | kind=code-symbol | source=components/ui/context-menu.tsx:L154 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenushortcut": "ContextMenuShortcut()" | kind=code-symbol | source=components/ui/context-menu.tsx:L166 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenusubcontent": "ContextMenuSubContent" | kind=code-symbol | source=components/ui/context-menu.tsx:L40 | neighbors=[context-menu.tsx]
- "ui_context_menu_contextmenusubtrigger": "ContextMenuSubTrigger" | kind=code-symbol | source=components/ui/context-menu.tsx:L19 | neighbors=[context-menu.tsx]
- "ui_dialog_dialogdescription": "DialogDescription" | kind=code-symbol | source=components/ui/dialog.tsx:L97 | neighbors=[dialog.tsx]
- "ui_dialog_dialogfooter": "DialogFooter()" | kind=code-symbol | source=components/ui/dialog.tsx:L68 | neighbors=[dialog.tsx]
- "ui_dialog_dialogheader": "DialogHeader()" | kind=code-symbol | source=components/ui/dialog.tsx:L54 | neighbors=[dialog.tsx]
- "ui_dialog_dialogoverlay": "DialogOverlay" | kind=code-symbol | source=components/ui/dialog.tsx:L15 | neighbors=[dialog.tsx]
- "ui_dialog_dialogtitle": "DialogTitle" | kind=code-symbol | source=components/ui/dialog.tsx:L82 | neighbors=[dialog.tsx]
- "ui_drawer_drawer": "Drawer()" | kind=code-symbol | source=components/ui/drawer.tsx:L6 | neighbors=[drawer.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-005.json

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
