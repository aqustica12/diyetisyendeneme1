
'use server';

/**
 * @fileOverview A flow to send a WhatsApp campaign message to selected clients.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const WhatsAppCampaignInputSchema = z.object({
  message: z.string().min(1, 'Mesaj boş olamaz.'),
  phoneNumbers: z.array(z.string()).min(1, 'En az bir telefon numarası seçilmelidir.'),
});
export type WhatsAppCampaignInput = z.infer<typeof WhatsAppCampaignInputSchema>;

const WhatsAppCampaignOutputSchema = z.object({
    success: z.boolean(),
    messagesSent: z.number(),
    errors: z.array(z.string()),
});
export type WhatsAppCampaignOutput = z.infer<typeof WhatsAppCampaignOutputSchema>;

export async function sendWhatsAppCampaign(input: WhatsAppCampaignInput): Promise<WhatsAppCampaignOutput> {
  return sendWhatsAppCampaignFlow(input);
}

const formatPhoneNumberForApi = (phone: string): string => {
    let cleaned = phone.replace(/\D/g, ''); // Remove all non-digits
    if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1); // Remove leading '0'
    }
    if (cleaned.length === 10) {
        return `90${cleaned}`;
    }
    if (cleaned.startsWith('90') && cleaned.length === 12) {
        return cleaned;
    }
    return ''; // Return empty string for invalid formats
};


const sendWhatsAppCampaignFlow = ai.defineFlow(
  {
    name: 'sendWhatsAppCampaignFlow',
    inputSchema: WhatsAppCampaignInputSchema,
    outputSchema: WhatsAppCampaignOutputSchema,
  },
  async ({ message, phoneNumbers }) => {
    console.log('Starting WhatsApp campaign flow with correct API info...');

    let messagesSent = 0;
    const errors: string[] = [];
    
    const API_ENDPOINT = 'https://my.wpileti.com/api/send-message';
    const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY;

    if (!WHATSAPP_API_KEY) {
        const errorMsg = `WhatsApp API Anahtarı (WPIleti) .env dosyasında ayarlanmamış.`;
        console.error(errorMsg);
        errors.push(errorMsg);
        return { success: false, messagesSent: 0, errors };
    }

    const uniquePhoneNumbers = new Set(phoneNumbers.filter(Boolean));
    console.log(`Sending campaign to ${uniquePhoneNumbers.size} unique phone numbers.`);

    for (const phone of uniquePhoneNumbers) {
        const formattedPhone = formatPhoneNumberForApi(phone);
        if (!formattedPhone) {
            const errorMsg = `Geçersiz telefon numarası formatı atlanıyor: ${phone}`;
            console.warn(errorMsg);
            errors.push(errorMsg);
            continue;
        }

        const apiPayload = {
            api_key: WHATSAPP_API_KEY,
            receiver: formattedPhone,
            data: {
                message: message
            }
        };

        try {
            console.log(`Sending campaign to ${formattedPhone} (from ${phone})`);
            
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify(apiPayload)
            });

            const responseData = await response.json();

            if (!response.ok || responseData.status === 'error' || responseData.status === false) {
                 const apiErrorMessage = responseData.message || JSON.stringify(responseData);
                 if (apiErrorMessage.includes('Invalid API Key')) {
                     throw new Error(`Geçersiz API Anahtarı. Lütfen .env dosyasındaki WHATSAPP_API_KEY değerini kontrol edin.`);
                 }
                 throw new Error(`API hatası: ${apiErrorMessage}`);
            }
            
            messagesSent++;
            
        } catch (error: any) {
            const errorMsg = `Kampanya ${phone} numarasına gönderilemedi: ${error.message}`;
            console.error(errorMsg);
            errors.push(errorMsg);
        }
    }
    
    console.log('WhatsApp campaign flow finished.');
    return {
        success: errors.length === 0 || messagesSent > 0,
        messagesSent,
        errors,
    };
  }
);
