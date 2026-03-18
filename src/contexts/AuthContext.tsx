import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  tenant_id: string;
  nome_completo: string;
  cargo: string | null;
  setor: string | null;
  avatar_url: string | null;
}

interface TenantInfo {
  id: string;
  nome: string;
  cnpj: string;
  municipio: string;
  uf: string;
  logo_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  tenant: TenantInfo | null;
  roles: string[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata?: Record<string, string>) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfileAndTenant = async (userId: string) => {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, tenant_id, nome_completo, cargo, setor, avatar_url")
        .eq("user_id", userId)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);

        const [tenantRes, rolesRes] = await Promise.all([
          supabase.from("tenants").select("id, nome, cnpj, municipio, uf, logo_url").eq("id", profileData.tenant_id).maybeSingle(),
          supabase.from("user_roles").select("role").eq("user_id", userId).eq("tenant_id", profileData.tenant_id),
        ]);

        if (tenantRes.data) setTenant(tenantRes.data);
        if (rolesRes.data) setRoles(rolesRes.data.map((r) => r.role));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(() => fetchProfileAndTenant(session.user.id), 0);
      } else {
        setProfile(null);
        setTenant(null);
        setRoles([]);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfileAndTenant(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, metadata?: Record<string, string>) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setTenant(null);
    setRoles([]);
  };

  const hasRole = (role: string) => roles.includes(role);

  return (
    <AuthContext.Provider value={{ user, session, profile, tenant, roles, loading, signIn, signUp, signOut, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
