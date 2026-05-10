import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactForm = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.contacts) {
            const existingContact = store.contacts.find(c => c.id === parseInt(id));
            if (existingContact) setContact(existingContact);
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const url = id 
            ? `https://playground.4geeks.com/contact/agendas/AgendaLNKR/contacts/${id}`
            : "https://playground.4geeks.com/contact/agendas/AgendaLNKR/contacts";
        
        const method = id ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact)
            });

            if (response.ok) {
                navigate("/list");
            }
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{id ? "Update Contact" : "Agrega un Nuevo Contacto"}</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input type="text" className="form-control" name="name" placeholder="Ingrese Nombre Completo" value={contact.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Escriba email" value={contact.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" name="phone" placeholder="Escriba teléfono" value={contact.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="address" placeholder="Escriba dirección" value={contact.address} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">Guardar</button>
                <Link to="/list" className="w-100 text-center d-block">
                    O volver a Contactos
                </Link>
            </form>
        </div>
    );
};
