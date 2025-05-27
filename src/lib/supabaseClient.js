// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Este log es útil, pero en producción querrás un manejo más robusto
  // o asegurar que las variables siempre estén presentes en el entorno de despliegue.
  console.error("Error: Supabase URL or Anon Key is missing. Check your environment variables.");
  // Podrías lanzar un error aquí si es crítico para la inicialización,
  // pero a veces este archivo se importa en contextos donde el error no es deseable.
  // Por ahora, dejaremos que falle en el uso si no están definidas.
}

// Creamos y exportamos una única instancia del cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);