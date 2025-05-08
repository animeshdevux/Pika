import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadFile(file: File, path: string) {
  const { data, error } = await supabase.storage.from("icons").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data.path
}

export function getPublicUrl(path: string) {
  const { data } = supabase.storage.from("icons").getPublicUrl(path)
  return data.publicUrl
}
