import { atom, map } from "nanostores";
import { supabase } from "../../config/supabase.config";

export const userLog = atom(null);

export const getUserLogged = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    const { user } = await data;

    if (!user) {
      return null;
    }

    return {
      email: user?.email,
      name: user?.user_metadata.name,
      id: user?.id,
      role: user?.role,
    };
  } catch (error) {
    console.log(error);
  }
};

getUserLogged().then((res) => userLog.set(res));

/* export const signOut = async () => {
  await supabase.auth.signOut();
  userLog.set(null);
  window.location.reload();
}; */