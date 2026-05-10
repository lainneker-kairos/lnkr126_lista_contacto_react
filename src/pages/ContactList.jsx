import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { ContactCard } from "../components/ContactCard";

export const ContactList = () => {
    const { store, actions } = useGlobalReducer();

    useEffect(() => {
        actions.fetchContacts();
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
