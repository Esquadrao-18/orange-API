import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

dotenv.config();

if(!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_URL and/or SUPABASE_KEY must be defined');
}

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase