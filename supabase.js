import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ncyxxkwuzcxtacerrwui.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jeXh4a3d1emN4dGFjZXJyd3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5OTIyNTUsImV4cCI6MjA1NzU2ODI1NX0.Hvit4y1eVIQWCUmqd48HcP0laN1_JKnp-kVQ3zPk0AY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
