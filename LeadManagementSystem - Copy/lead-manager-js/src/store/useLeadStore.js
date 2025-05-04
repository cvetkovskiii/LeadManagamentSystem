import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Zustand-Store zur Verwaltung von Leads und Kunden
export const useLeadStore = create(
  persist(
    (set) => ({
      leads: [],
      customers: [],

      addLead: (leadData) =>
        set((state) => ({
          leads: [...state.leads, { id: uuidv4(), ...leadData }],
        })),

      deleteLead: (id) =>
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
        })),

      // Lead in Kunden umwandeln
      convertToCustomer: (id) =>
        set((state) => {
          const lead = state.leads.find((l) => l.id === id);
          if (!lead) return state;

          return {
            leads: state.leads.filter((l) => l.id !== id),
            customers: [...state.customers, lead],
          };
        }),

      // Bestehenden Lead aktualisieren
      updateLead: (updatedLead) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
          ),
        })),

      // Kunde löschen
      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
        })),
    }),
    {
      // Speichert Daten
      name: 'lead-storage',
    }
  )
);
