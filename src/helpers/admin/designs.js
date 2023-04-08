import { supabase } from "../../config/supabase.config";

export const deleteDesignById = async (id) => {
  await supabase.from("designs").delete().eq("id", id);
};

export const updateDesignById = async (id, name, image) => {
  await supabase.from("designs").update({ name, image }).eq("id", id);
};
