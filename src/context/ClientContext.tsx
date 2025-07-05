
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { clientsData as initialClients } from '@/lib/client-data';

export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    status: "Aktif" | "Pasif" | "Beklemede";
    joinDate: string;
}

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (updatedClient: Client) => void;
  deleteClient: (id: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    try {
        const item = window.localStorage.getItem('clients');
        if (item) {
            setClients(JSON.parse(item));
        } else {
            setClients(initialClients);
        }
    } catch (error) {
        console.error("Failed to load clients from localStorage", error);
        setClients(initialClients);
    }
  }, []);

  useEffect(() => {
    // Avoid setting empty array on initial load if initialClients is not ready
    if(clients.length > 0) {
        try {
            window.localStorage.setItem('clients', JSON.stringify(clients));
        } catch (error) {
            console.error("Failed to save clients to localStorage", error);
        }
    }
  }, [clients]);

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...client,
      id: new Date().toISOString(),
    };
    setClients(prevClients => [newClient, ...prevClients]);
  };

  const updateClient = (updatedClient: Client) => {
    setClients(prevClients => prevClients.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  const deleteClient = (id: string) => {
    setClients(prevClients => prevClients.filter(c => c.id !== id));
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
}
