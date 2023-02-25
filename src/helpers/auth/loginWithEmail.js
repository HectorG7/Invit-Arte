import { supabase } from "../../config/supabase.config";

export const loginWithEmail = async (email, password) => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return await response;
};
