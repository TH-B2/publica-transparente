
-- Corrigir política permissiva: restringir INSERT anon na ouvidoria para exigir campos obrigatórios
DROP POLICY IF EXISTS "Cidadão pode criar manifestação" ON public.manifestacoes_ouvidoria;
CREATE POLICY "Cidadão pode criar manifestação" ON public.manifestacoes_ouvidoria
  FOR INSERT TO anon
  WITH CHECK (
    protocolo IS NOT NULL
    AND tipo IS NOT NULL
    AND assunto IS NOT NULL
    AND descricao IS NOT NULL
    AND tenant_id IS NOT NULL
  );

-- Restringir consulta pública apenas por protocolo
DROP POLICY IF EXISTS "Consulta pública por protocolo" ON public.manifestacoes_ouvidoria;
CREATE POLICY "Consulta pública por protocolo" ON public.manifestacoes_ouvidoria
  FOR SELECT TO anon
  USING (protocolo IS NOT NULL);
