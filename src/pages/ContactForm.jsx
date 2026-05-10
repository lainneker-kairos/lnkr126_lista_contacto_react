import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ContactForm = () => {
    const { store, actions } = useGlobalReducer();
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
        
        let success = false;
        if (id) {
            success = await actions.updateContact(id, contact);
        } else {
            success = await actions.addContact(contact);
        }

        if (success) {
            navigate("/list");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">{id ? "Actualizar Contacto" : "Agrega un Nuevo Contacto"}</h1>
            <form onSubmit={handleSubmit} className="mt-4 shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label fw-bold">Nombre Completo</label>
                    <input type="text" className="form-control" name="name" placeholder="Ingrese Nombre Completo" value={contact.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Escriba email" value={contact.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Teléfono</label>
                    <input type="text" className="form-control" name="phone" placeholder="Escriba teléfono" value={contact.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Dirección</label>
                    <input type="text" className="form-control" name="address" placeholder="Escriba dirección" value={contact.address} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">Guardar Contacto</button>
                <Link to="/list" className="w-100 text-center d-block text-decoration-none">
                    O volver a la lista de contactos
                </Link>
            </form>
        </div>
    );
};