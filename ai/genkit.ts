import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import type { GenkitOptions } from 'genkit';

const options: GenkitOptions = {
    plugins: [],
};

if (process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY) {
    if(options.plugins) {
        options.plugins.push(googleAI());
    }
    options.model = 'googleai/gemini-2.0-flash';
}

export const ai = genkit(options);
