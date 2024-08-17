import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ioefjkssfcuhmvvolteu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZWZqa3NzZmN1aG12dm9sdGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNzkzMDcsImV4cCI6MjAzNzg1NTMwN30.mbmJGPIm63ZMPN4ABjD8VF1HJalB-h8ecSkTaFqM8jA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
