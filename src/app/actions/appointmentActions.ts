
'use server';
    
import type { Appointment } from '@/context/AppointmentContext';
import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const dataFilePath = path.join(process.cwd(), 'src/lib/data/appointments.json');

async function readAppointments(): Promise<Appointment[]> {
    try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
    } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
    }
    console.error('Error reading appointments file:', error);
    throw new Error('Could not read appointments data.');
    }
}

async function writeAppointments(data: Appointment[]): Promise<void> {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function getAppointments(): Promise<Appointment[]> {
    return await readAppointments();
}

export async function addAppointmentAction(appointment: Omit<Appointment, 'id' | 'reminderSent'>): Promise<Appointment> {
    const appointments = await readAppointments();
    const newAppointment: Appointment = {
        ...appointment,
        id: new Date().toISOString(),
        reminderSent: false,
    };
    const updatedAppointments = [newAppointment, ...appointments];
    await writeAppointments(updatedAppointments);
    revalidatePath('/admin/appointments');
    revalidatePath('/admin');
    return newAppointment;
}

export async function addClientAppointmentAction(appointment: Omit<Appointment, 'id' | 'status' | 'price' | 'reminderSent'>): Promise<Appointment> {
    const appointments = await readAppointments();
    const newAppointment: Appointment = {
        ...appointment,
        id: new Date().toISOString(),
        status: 'Beklemede',
        reminderSent: false,
    };
    const updatedAppointments = [newAppointment, ...appointments];
    await writeAppointments(updatedAppointments);
    revalidatePath('/appointment');
    return newAppointment;
}

export async function updateAppointmentAction(updatedAppointment: Appointment): Promise<Appointment> {
    const appointments = await readAppointments();
    const index = appointments.findIndex(a => a.id === updatedAppointment.id);
    if (index === -1) throw new Error('Appointment not found');
    
    appointments[index] = updatedAppointment;
    await writeAppointments(appointments);
    revalidatePath('/admin/appointments');
    revalidatePath('/admin');
    return updatedAppointment;
}

export async function deleteAppointmentAction(id: string): Promise<{ success: true }> {
    let appointments = await readAppointments();
    const updatedAppointments = appointments.filter(a => a.id !== id);
    if (appointments.length === updatedAppointments.length) {
        throw new Error('Appointment not found');
    }
    await writeAppointments(updatedAppointments);
    revalidatePath('/admin/appointments');
    revalidatePath('/admin');
    return { success: true };
}
