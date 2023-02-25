import { supabase } from "../../config/supabase.config";

export const registerNewUser = async (email, password, name) => {
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  return await response;
};
