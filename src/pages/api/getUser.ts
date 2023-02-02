/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */
import { supabase } from "../../lib/initSupabase";

export async function getUserWithGoogle() {
  const { data, error } = await supabase.auth.getUser();

  return { data, error };
}
