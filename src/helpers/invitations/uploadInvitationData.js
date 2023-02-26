import { supabase } from "../../config/supabase.config";

export const uploadInvitationData = async (data = {}) => {
  const { error } = await supabase.from("invitations").insert(data);
};
