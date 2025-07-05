
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
    getAppointments, 
    addAppointmentAction, 
    addClientAppointmentAction, 
    updateAppointmentAction, 
    deleteAppointmentAction 
} from '@/app/actions/appointmentActions';


export interface Appointment {
    id: string;
    clientName: string;
    date: string;
    time: string;
    status: "Onaylandı" | "Beklemede" | "İptal Edildi";
    price?: number;
    reminderSent?: boolean;
}


interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'reminderSent'>) => Promise<void>;
  addClientAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'price' | 'reminderSent'>) => Promise<Appointment>;
  updateAppointment: (updatedAppointment: Appointment) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    getAppointments().then(setAppointments).catch(console.error);
  }, []);

  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'reminderSent'>) => {
    try {
        const newAppointment = await addAppointmentAction(appointment);
        setAppointments(prevAppointments => [newAppointment, ...prevAppointments]);
    } catch (error) {
        console.error("Failed to add appointment:", error);
    }
  };

  const addClientAppointment = async (appointment: Omit<Appointment, 'id' | 'status' | 'price' | 'reminderSent'>) => {
    const newAppointment = await addClientAppointmentAction(appointment);
    setAppointments(prevAppointments => [newAppointment, ...prevAppointments]);
    return newAppointment;
  };


  const updateAppointment = async (updatedAppointment: Appointment) => {
    try {
        const result = await updateAppointmentAction(updatedAppointment);
        setAppointments(prevAppointments => prevAppointments.map(a => a.id === result.id ? result : a));
    } catch(error) {
        console.error("Failed to update appointment:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
        await deleteAppointmentAction(id);
        setAppointments(prevAppointments => prevAppointments.filter(a => a.id !== id));
    } catch(error) {
        console.error("Failed to delete appointment:", error);
    }
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, addClientAppointment, updateAppointment, deleteAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
}
