import { supabaseAdm } from "../../config/supabase.config";

export const updateUser = async (id, data = {}) => {
  try {
    await supabaseAdm.auth.admin.updateUserById(id, data);
  } catch (error) {
    console.log(error);
  }
};
