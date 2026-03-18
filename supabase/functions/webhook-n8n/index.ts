import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-webhook-secret",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate webhook secret
    const webhookSecret = req.headers.get("x-webhook-secret");
    const expectedSecret = Deno.env.get("N8N_WEBHOOK_SECRET");

    if (expectedSecret && webhookSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    // Validate required fields
    const { tenant_id, tipo_alerta, descricao, nivel_risco, dados_origem, entidade_origem, entidade_id } = body;

    if (!tenant_id || !tipo_alerta || !descricao || !nivel_risco) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: tenant_id, tipo_alerta, descricao, nivel_risco" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!["baixo", "medio", "alto", "critico"].includes(nivel_risco)) {
      return new Response(
        JSON.stringify({ error: "nivel_risco must be: baixo, medio, alto, or critico" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from("alertas_ia").insert({
      tenant_id,
      tipo_alerta,
      descricao,
      nivel_risco,
      dados_origem: dados_origem || null,
      entidade_origem: entidade_origem || null,
      entidade_id: entidade_id || null,
    }).select().single();

    if (error) {
      console.error("Insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create alert", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, alert_id: data.id }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
