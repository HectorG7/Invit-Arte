import { supabaseAdm } from "../../config/supabase.config";

export const deleteUserById = async (id) => {
  await supabaseAdm.auth.admin.deleteUser(id);
};
