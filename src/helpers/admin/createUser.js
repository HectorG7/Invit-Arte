import { supabaseAdm } from "../../config/supabase.config";

export const createUser = async (email, password, name) => {
  /* try {
  } catch (error) {
    console.log(error);
  } */
  /* await supabaseAdm.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      name,
    },
    email_confirm: true,
  }); */

  const { data, error } = await supabaseAdm.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      name,
    },
    email_confirm: true,
  });

  return {
    data,
    error,
  };
};
