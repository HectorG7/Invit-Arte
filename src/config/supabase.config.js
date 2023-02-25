import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const keyadm = import.meta.env.PUBLIC_SUPABASE_ANON_KEY_ADM;

export const supabase = createClient(url, key);
export const supabaseAdm = createClient(url, keyadm);
