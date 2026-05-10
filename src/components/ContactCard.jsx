import { useState } from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, fetchContacts }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaLNKR/contacts/${contact.id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchContacts(); 
                setShowModal(false); 
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    if(!contact) return null;

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
            <div className="d-flex align-items-center">
                {/* estoy usando pravatar para las imágenes aleatorias */}
                <img 
                    src={`https://i.pravatar.cc/150?u=${contact.id}`} 
                    alt="avatar" 
                    className="rounded-circle me-3" 
                    width="80" 
                    height="80" 
                />
                <div>
                    <h5 className="mb-1">{contact.name}</h5>
                    <p className="mb-1 text-muted"><i className="fa-solid fa-location-dot me-2"></i>{contact.address}</p>
                    <p className="mb-1 text-muted"><i className="fa-solid fa-phone me-2"></i>{contact.phone}</p>
                    <p className="mb-0 text-muted"><i className="fa-solid fa-envelope me-2"></i>{contact.email}</p>
                </div>
            </div>
            <div>
                {/* Botón que navega a la ruta de editar */}
                <Link to={`/edit/${contact.id}`} className="btn btn-light me-2">
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                {/* Botón que abre el modal */}
                <button className="btn btn-light" onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>

            {/* Modal de confirmación para eliminar */}
            {showModal && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> ¿Quieres eliminar este contacto?</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>¡Si borras este contacto, no podrás recuperarlo!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar!</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}> ¡si, eliminar!</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};
