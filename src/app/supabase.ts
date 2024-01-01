import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iefaqndqhivmuelkgvvt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZmFxbmRxaGl2bXVlbGtndnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNzg0MjksImV4cCI6MjAxOTY1NDQyOX0.b6PLzdCi6zblNklNMwVAkiX2Onmj-fRGsXDWbFXpkJo";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
