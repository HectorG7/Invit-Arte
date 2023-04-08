import { supabase } from "../../config/supabase.config";

export const getCategories = async () => {
  try {
    const { data } = await supabase.from("categories").select();
    return data;
  } catch (error) {
    return error;
  }
};

export const getDesignsByCategorie = async (categorie) => {
  try {
    const { data } = await supabase.from("categories").select(`
  id, designs (*)`);

    const result = data.find(({ id }) => id === categorie);

    return result;
  } catch (error) {
    return error;
  }
};
