import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    const actions = {
        fetchContacts: async () => {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/AgendaLNKR/contacts");
                
                if (response.status === 404) {
                    await fetch("https://playground.4geeks.com/contact/agendas/AgendaLNKR", { 
                        method: "POST" 
                    });
                    dispatch({ type: "set_contacts", payload: [] });
                    return;
                }
                
                const data = await response.json();
                dispatch({ type: "set_contacts", payload: data.contacts });
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        },

        deleteContact: async (id) => {
            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaLNKR/contacts/${id}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    dispatch({ type: "delete_contact", payload: id });
                    return true;
                }
            } catch (error) {
                console.error("Error al eliminar el contacto:", error);
            }
            return false;
        },

        addContact: async (contact) => {
            try {
                const response = await fetch("https://playground.4geeks.com/contact/agendas/AgendaLNKR/contacts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contact)
                });
                if (response.ok) {
                    const savedContact = await response.json();
                    dispatch({ type: "add_contact", payload: savedContact });
                    return true; 
                }
            } catch (error) {
                console.error("Error al crear el contacto:", error);
            }
            return false;
        },

        updateContact: async (id, contact) => {
            try {
                const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaLNKR/contacts/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(contact)
                });
                if (response.ok) {
                    const savedContact = await response.json();
                    dispatch({ type: "update_contact", payload: savedContact });
                    return true; 
                }
            } catch (error) {
                console.error("Error al actualizar el contacto:", error);
            }
            return false;
        }
    };

    return (
        <StoreContext.Provider value={{ store, dispatch, actions }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    return context;
}