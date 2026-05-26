import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return json({ error: "OPENAI_API_KEY is not configured" }, 500);
    }

    const { images } = await req.json();
    if (!Array.isArray(images) || images.length === 0 || images.length > 2) {
      return json({ error: "Upload one or two product images" }, 400);
    }

    const imageContent = images.map((imageUrl: string) => ({
      type: "input_image",
      image_url: imageUrl,
      detail: "high",
    }));

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-5.4-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text:
                  "Extract product details for an invoice from these photos. Return only JSON with productName, model, serialNumber, color, and price. Include the visible brand/manufacturer in productName when present, for example 'Ambrane Power Bank' instead of only 'Power Bank'. Use empty strings for missing text and null for missing price.",
              },
              ...imageContent,
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "product_details",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                productName: { type: "string" },
                model: { type: "string" },
                serialNumber: { type: "string" },
                color: { type: "string" },
                price: { anyOf: [{ type: "number" }, { type: "null" }] },
              },
              required: ["productName", "model", "serialNumber", "color", "price"],
            },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return json({ error: errorText }, response.status);
    }

    const data = await response.json();
    const outputText =
      data.output_text ??
      data.output?.flatMap((item: { content?: Array<{ text?: string }> }) => item.content ?? []).find((content: { text?: string }) => content.text)?.text;

    if (!outputText) {
      return json({ error: "No product details were extracted" }, 422);
    }

    return json(JSON.parse(outputText));
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unable to extract product details" }, 500);
  }
});
