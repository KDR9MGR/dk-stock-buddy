# Node Description Batch 7 of 10

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

- "ui_drawer_drawercontent": "DrawerContent" | kind=code-symbol | source=components/ui/drawer.tsx:L35 | neighbors=[drawer.tsx]
- "ui_drawer_drawerdescription": "DrawerDescription" | kind=code-symbol | source=components/ui/drawer.tsx:L93 | neighbors=[drawer.tsx]
- "ui_drawer_drawerfooter": "DrawerFooter()" | kind=code-symbol | source=components/ui/drawer.tsx:L67 | neighbors=[drawer.tsx]
- "ui_drawer_drawerheader": "DrawerHeader()" | kind=code-symbol | source=components/ui/drawer.tsx:L56 | neighbors=[drawer.tsx]
- "ui_drawer_draweroverlay": "DrawerOverlay" | kind=code-symbol | source=components/ui/drawer.tsx:L23 | neighbors=[drawer.tsx]
- "ui_drawer_drawertitle": "DrawerTitle" | kind=code-symbol | source=components/ui/drawer.tsx:L78 | neighbors=[drawer.tsx]
- "ui_dropdown_menu_dropdownmenucheckboxitem": "DropdownMenuCheckboxItem" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L93 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenucontent": "DropdownMenuContent" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L57 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuitem": "DropdownMenuItem" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L75 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenulabel": "DropdownMenuLabel" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L139 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuradioitem": "DropdownMenuRadioItem" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L117 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L157 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenushortcut": "DropdownMenuShortcut()" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L169 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubcontent": "DropdownMenuSubContent" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L41 | neighbors=[dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenusubtrigger": "DropdownMenuSubTrigger" | kind=code-symbol | source=components/ui/dropdown-menu.tsx:L19 | neighbors=[dropdown-menu.tsx]
- "ui_form_formcontrol": "FormControl" | kind=code-symbol | source=components/ui/form.tsx:L104 | neighbors=[form.tsx]
- "ui_form_formdescription": "FormDescription" | kind=code-symbol | source=components/ui/form.tsx:L126 | neighbors=[form.tsx]
- "ui_form_formfield": "FormField()" | kind=code-symbol | source=components/ui/form.tsx:L29 | neighbors=[form.tsx]
- "ui_form_formfieldcontext": "FormFieldContext" | kind=code-symbol | source=components/ui/form.tsx:L25 | neighbors=[form.tsx]
- "ui_form_formfieldcontextvalue": "FormFieldContextValue" | kind=code-symbol | source=components/ui/form.tsx:L18 | neighbors=[form.tsx]
- "ui_form_formitem": "FormItem" | kind=code-symbol | source=components/ui/form.tsx:L73 | neighbors=[form.tsx]
- "ui_form_formitemcontext": "FormItemContext" | kind=code-symbol | source=components/ui/form.tsx:L69 | neighbors=[form.tsx]
- "ui_form_formitemcontextvalue": "FormItemContextValue" | kind=code-symbol | source=components/ui/form.tsx:L65 | neighbors=[form.tsx]
- "ui_form_formlabel": "FormLabel" | kind=code-symbol | source=components/ui/form.tsx:L87 | neighbors=[form.tsx]
- "ui_form_formmessage": "FormMessage" | kind=code-symbol | source=components/ui/form.tsx:L143 | neighbors=[form.tsx]
- "ui_form_useformfield": "useFormField()" | kind=code-symbol | source=components/ui/form.tsx:L42 | neighbors=[form.tsx]
- "ui_hover_card_hovercardcontent": "HoverCardContent" | kind=code-symbol | source=components/ui/hover-card.tsx:L10 | neighbors=[hover-card.tsx]
- "ui_input_otp_inputotp": "InputOTP" | kind=code-symbol | source=components/ui/input-otp.tsx:L7 | neighbors=[input-otp.tsx]
- "ui_input_otp_inputotpgroup": "InputOTPGroup" | kind=code-symbol | source=components/ui/input-otp.tsx:L23 | neighbors=[input-otp.tsx]
- "ui_input_otp_inputotpseparator": "InputOTPSeparator" | kind=code-symbol | source=components/ui/input-otp.tsx:L59 | neighbors=[input-otp.tsx]
- "ui_input_otp_inputotpslot": "InputOTPSlot" | kind=code-symbol | source=components/ui/input-otp.tsx:L31 | neighbors=[input-otp.tsx]
- "ui_label_labelvariants": "labelVariants" | kind=code-symbol | source=components/ui/label.tsx:L7 | neighbors=[label.tsx]
- "ui_menubar_menubar": "Menubar" | kind=code-symbol | source=components/ui/menubar.tsx:L17 | neighbors=[menubar.tsx]
- "ui_menubar_menubarcheckboxitem": "MenubarCheckboxItem" | kind=code-symbol | source=components/ui/menubar.tsx:L126 | neighbors=[menubar.tsx]
- "ui_menubar_menubarcontent": "MenubarContent" | kind=code-symbol | source=components/ui/menubar.tsx:L83 | neighbors=[menubar.tsx]
- "ui_menubar_menubaritem": "MenubarItem" | kind=code-symbol | source=components/ui/menubar.tsx:L108 | neighbors=[menubar.tsx]
- "ui_menubar_menubarlabel": "MenubarLabel" | kind=code-symbol | source=components/ui/menubar.tsx:L171 | neighbors=[menubar.tsx]
- "ui_menubar_menubarradioitem": "MenubarRadioItem" | kind=code-symbol | source=components/ui/menubar.tsx:L149 | neighbors=[menubar.tsx]
- "ui_menubar_menubarseparator": "MenubarSeparator" | kind=code-symbol | source=components/ui/menubar.tsx:L189 | neighbors=[menubar.tsx]
- "ui_menubar_menubarshortcut": "MenubarShortcut()" | kind=code-symbol | source=components/ui/menubar.tsx:L201 | neighbors=[menubar.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /Users/arbazkudekar/Documents/Dk stock buddy/src/.graphify/description-instructions/batch-006.json

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
