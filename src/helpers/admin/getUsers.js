import { supabaseAdm } from "../../config/supabase.config";

export const getUsers = async () => {
  try {
    const { data } = await supabaseAdm.auth.admin.listUsers();
    const { users } = await data;
    return users;
  } catch (error) {
    return error;
  }
};
