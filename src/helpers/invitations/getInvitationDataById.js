import { supabase } from "../../config/supabase.config";

export const getInvitationDataById = async (id) => {
  const { data, error } = await supabase
    .from("invitations")
    .select()
    .eq("id", id);

  return {
    data,
    error,
  };
};
