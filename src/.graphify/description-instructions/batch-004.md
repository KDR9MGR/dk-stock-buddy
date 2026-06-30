# Node Description Batch 5 of 10

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

- "lib_invoicepdf_productsubtitle": "productSubtitle()" | kind=code-symbol | source=lib/invoicePdf.ts:L26 | neighbors=[invoicePdf.ts]
- "main": "main.tsx" | kind=code-symbol | source=main.tsx:L1 | neighbors=[App.tsx]
- "pages_index_index": "Index()" | kind=code-symbol | source=pages/Index.tsx:L14 | neighbors=[Index.tsx]
- "pages_notfound_notfound": "NotFound()" | kind=code-symbol | source=pages/NotFound.tsx:L4 | neighbors=[NotFound.tsx]
- "supabase_types_compositetypes": "CompositeTypes" | kind=code-symbol | source=integrations/supabase/types.ts:L208 | neighbors=[types.ts]
- "supabase_types_constants": "Constants" | kind=code-symbol | source=integrations/supabase/types.ts:L225 | neighbors=[types.ts]
- "supabase_types_databasewithoutinternals": "DatabaseWithoutInternals" | kind=code-symbol | source=integrations/supabase/types.ts:L108 | neighbors=[types.ts]
- "supabase_types_defaultschema": "DefaultSchema" | kind=code-symbol | source=integrations/supabase/types.ts:L110 | neighbors=[types.ts]
- "supabase_types_enums": "Enums" | kind=code-symbol | source=integrations/supabase/types.ts:L191 | neighbors=[types.ts]
- "supabase_types_json": "Json" | kind=code-symbol | source=integrations/supabase/types.ts:L1 | neighbors=[types.ts]
- "supabase_types_tablesupdate": "TablesUpdate" | kind=code-symbol | source=integrations/supabase/types.ts:L166 | neighbors=[types.ts]
- "ui_accordion_accordioncontent": "AccordionContent" | kind=code-symbol | source=components/ui/accordion.tsx:L41 | neighbors=[accordion.tsx]
- "ui_accordion_accordionitem": "AccordionItem" | kind=code-symbol | source=components/ui/accordion.tsx:L9 | neighbors=[accordion.tsx]
- "ui_accordion_accordiontrigger": "AccordionTrigger" | kind=code-symbol | source=components/ui/accordion.tsx:L21 | neighbors=[accordion.tsx]
- "ui_alert_alerttitle": "AlertTitle" | kind=code-symbol | source=components/ui/alert.tsx:L35 | neighbors=[alert.tsx]
- "ui_alert_alertvariants": "alertVariants" | kind=code-symbol | source=components/ui/alert.tsx:L6 | neighbors=[alert.tsx]
- "ui_alert_dialog_alertdialogoverlay": "AlertDialogOverlay" | kind=code-symbol | source=components/ui/alert-dialog.tsx:L13 | neighbors=[alert-dialog.tsx]
- "ui_avatar_avatar": "Avatar" | kind=code-symbol | source=components/ui/avatar.tsx:L6 | neighbors=[avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback" | kind=code-symbol | source=components/ui/avatar.tsx:L33 | neighbors=[avatar.tsx]
- "ui_avatar_avatarimage": "AvatarImage" | kind=code-symbol | source=components/ui/avatar.tsx:L21 | neighbors=[avatar.tsx]
- "ui_badge_badgeprops": "BadgeProps" | kind=code-symbol | source=components/ui/badge.tsx:L26 | neighbors=[badge.tsx]
- "ui_breadcrumb_breadcrumb": "Breadcrumb" | kind=code-symbol | source=components/ui/breadcrumb.tsx:L7 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbellipsis": "BreadcrumbEllipsis()" | kind=code-symbol | source=components/ui/breadcrumb.tsx:L91 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbitem": "BreadcrumbItem" | kind=code-symbol | source=components/ui/breadcrumb.tsx:L30 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblink": "BreadcrumbLink" | kind=code-symbol | source=components/ui/breadcrumb.tsx:L42 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumblist": "BreadcrumbList" | kind=code-symbol | source=components/ui/breadcrumb.tsx:L15 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbpage": "BreadcrumbPage" | kind=code-symbol | source=components/ui/breadcrumb.tsx:L60 | neighbors=[breadcrumb.tsx]
- "ui_breadcrumb_breadcrumbseparator": "BreadcrumbSeparator()" | kind=code-symbol | source=components/ui/breadcrumb.tsx:L75 | neighbors=[breadcrumb.tsx]
- "ui_calendar_calendar": "Calendar()" | kind=code-symbol | source=components/ui/calendar.tsx:L10 | neighbors=[calendar.tsx]
- "ui_calendar_calendarprops": "CalendarProps" | kind=code-symbol | source=components/ui/calendar.tsx:L8 | neighbors=[calendar.tsx]
- "ui_card_cardfooter": "CardFooter" | kind=code-symbol | source=components/ui/card.tsx:L67 | neighbors=[card.tsx]
- "ui_carousel_carousel": "Carousel" | kind=code-symbol | source=components/ui/carousel.tsx:L43 | neighbors=[carousel.tsx]
- "ui_carousel_carouselapi": "CarouselApi" | kind=code-symbol | source=components/ui/carousel.tsx:L10 | neighbors=[carousel.tsx]
- "ui_carousel_carouselcontent": "CarouselContent" | kind=code-symbol | source=components/ui/carousel.tsx:L151 | neighbors=[carousel.tsx]
- "ui_carousel_carouselcontext": "CarouselContext" | kind=code-symbol | source=components/ui/carousel.tsx:L31 | neighbors=[carousel.tsx]
- "ui_carousel_carouselcontextprops": "CarouselContextProps" | kind=code-symbol | source=components/ui/carousel.tsx:L22 | neighbors=[carousel.tsx]
- "ui_carousel_carouselitem": "CarouselItem" | kind=code-symbol | source=components/ui/carousel.tsx:L173 | neighbors=[carousel.tsx]
- "ui_carousel_carouselnext": "CarouselNext" | kind=code-symbol | source=components/ui/carousel.tsx:L224 | neighbors=[carousel.tsx]
- "ui_carousel_carouseloptions": "CarouselOptions" | kind=code-symbol | source=components/ui/carousel.tsx:L12 | neighbors=[carousel.tsx]
- "ui_carousel_carouselplugin": "CarouselPlugin" | kind=code-symbol | source=components/ui/carousel.tsx:L13 | neighbors=[carousel.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-004.json

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
