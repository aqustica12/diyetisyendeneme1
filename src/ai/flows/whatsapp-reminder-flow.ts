
'use server';

/**
 * @fileOverview A flow to automatically send WhatsApp reminders for appointments.
 * This flow is designed to be run on a schedule (e.g., every 15 minutes via a cron job).
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';
import type { Appointment } from '@/context/AppointmentContext';
import { clientsData } from '@/lib/client-data';


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

const dataFilePath = path.join(process.cwd(), 'src/lib/data/appointments.json');

export const sendWhatsAppReminders = ai.defineFlow(
  {
    name: 'sendWhatsAppReminders',
    inputSchema: z.void(),
    outputSchema: z.object({
        success: z.boolean(),
        remindersSent: z.number(),
        errors: z.array(z.string()),
    }),
  },
  async () => {
    console.log('Starting WhatsApp reminder flow (15-minute check)...');

    // Read appointments from the central JSON file
    const appointmentsJson = await fs.readFile(dataFilePath, 'utf-8');
    const allAppointments: Appointment[] = JSON.parse(appointmentsJson);

    const clients = clientsData; // In a real app, this would also come from a database
    let remindersSent = 0;
    const errors: string[] = [];
    let appointmentsUpdated = false;

    // Use Turkey's timezone for all date operations to avoid server/client mismatches
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));
    
    // This cron job runs every 15 minutes.
    // We check for appointments in a window between 24 hours and 24 hours + 15 minutes from now.
    // This ensures each appointment reminder is sent only once.
    const reminderWindowStart = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const reminderWindowEnd = new Date(now.getTime() + (24 * 60 + 15) * 60 * 1000);
    
    console.log(`Checking for appointments between ${reminderWindowStart.toISOString()} and ${reminderWindowEnd.toISOString()} (Turkey Time)`);

    const remindersToSend = allAppointments.filter(a => {
        if (a.status !== 'Onaylandı' || a.reminderSent) {
            return false;
        }
        
        // Treat stored date/time as being in Turkey's timezone
        const appointmentDateTime = new Date(`${a.date}T${a.time}:00`);

        if (isNaN(appointmentDateTime.getTime())) {
            console.warn(`Invalid date/time format for appointment ID ${a.id}: ${a.date} ${a.time}`);
            return false;
        }
        
        return appointmentDateTime >= reminderWindowStart && appointmentDateTime < reminderWindowEnd;
    });

    console.log(`Found ${remindersToSend.length} reminders to send.`);

    if (remindersToSend.length > 0) {
        const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY;
        const API_ENDPOINT = 'https://my.wpileti.com/api/send-message';

        if (!WHATSAPP_API_KEY) {
            const errorMsg = `WhatsApp API Anahtarı (WPIleti) .env dosyasında ayarlanmamış.`;
            console.error(errorMsg);
            errors.push(errorMsg);
            return { success: false, remindersSent, errors };
        }

        for (const appointment of remindersToSend) {
            const client = clients.find(c => c.name === appointment.clientName || c.email === appointment.clientName);

            if (!client || !client.phone) {
                const errorMsg = `Client '${appointment.clientName}' not found or has no phone number.`;
                console.error(errorMsg);
                errors.push(errorMsg);
                continue;
            }
            
            const formattedPhone = formatPhoneNumberForApi(client.phone);
             if (!formattedPhone) {
                const errorMsg = `Skipping invalid phone number format for ${client.name}: ${client.phone}`;
                console.warn(errorMsg);
                errors.push(errorMsg);
                continue;
            }

            const formattedDate = new Date(appointment.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
            const messageBody = `Merhaba ${client.name}. Yarın, ${formattedDate} tarihinde saat ${appointment.time}'deki randevunuzu hatırlatmak isteriz. Sağlıklı günler! - Fitopya`;
            
            const apiPayload = {
                api_key: WHATSAPP_API_KEY,
                receiver: formattedPhone,
                data: {
                    message: messageBody,
                },
            };

            try {
                console.log(`Sending reminder to ${client.name} at ${formattedPhone}`);
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
                
                console.log(`Successfully sent reminder for appointment ID: ${appointment.id}`);
                remindersSent++;
                
                // Mark the appointment as reminderSent in the main list
                const appointmentInList = allAppointments.find(a => a.id === appointment.id);
                if (appointmentInList) {
                    appointmentInList.reminderSent = true;
                    appointmentsUpdated = true;
                }
                
            } catch (error: any) {
                const errorMsg = `Mesaj ${client.name} kişisine gönderilemedi: ${error.message}`;
                console.error(errorMsg);
                errors.push(errorMsg);
            }
        }
    }

    if (appointmentsUpdated) {
        try {
            await fs.writeFile(dataFilePath, JSON.stringify(allAppointments, null, 2), 'utf-8');
            console.log('Appointments file updated with reminder statuses.');
        } catch (error) {
            const errorMsg = `CRITICAL: Failed to write updated appointments file: ${(error as Error).message}`;
            console.error(errorMsg);
            errors.push(errorMsg);
        }
    }
    
    console.log('WhatsApp reminder flow finished.');
    return {
        success: errors.length === 0 || remindersSent > 0,
        remindersSent,
        errors,
    };
  }
);
