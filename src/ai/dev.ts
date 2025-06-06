
import { config } from 'dotenv';
config({ path: process.cwd() + '/.env' }); // Ensure .env is loaded correctly

import '@/ai/flows/generate-travel-suggestions.ts';
import '@/ai/flows/decide-travel-facts.ts';
