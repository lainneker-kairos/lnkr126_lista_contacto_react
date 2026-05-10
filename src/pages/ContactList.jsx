import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const ContactList = () => {
    const { store, dispatch } = useGlobalReducer();

    const fetchContacts = async () => {
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
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/create">
                    <button className="btn btn-success">Agregar Nuevo Contacto</button>
                </Link>
            </div>
            <ul className="list-group">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <ContactCard 
                            key={contact.id} 
                            contact={contact} 
                            fetchContacts={fetchContacts}
                        />
                    ))
                ) : (
                    <li className="list-group-item text-center">
                        <h4 className="my-3 text-muted">No hay Contactos. Agrega un Nuevo Contacto!</h4>
                    </li>
                )}
            </ul>
        </div>
    );
};
