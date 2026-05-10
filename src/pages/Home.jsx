import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<div className="container text-center mt-5">
			<div className="p-5 mb-4 bg-light rounded-3 shadow-lg">
				<div className="container-fluid py-5">
					<h1 className="display-4 fw-bold mb-3 text-dark">
                        <i className="fa-solid fa-address-book text-primary me-3"></i>
                        Aplicación de contactos LNKR
                    </h1>
					<p className="col-md-8 mx-auto fs-4 text-muted mb-5">
						Una aplicación moderna e interactiva para gestionar tus contactos sin complicaciones.
						Desarrollada con React, Context API y Bootstrap.
					</p>
					<div className="d-flex justify-content-center gap-3">
                        {/* Botón que conecta con ContactList */}
                        <Link to="/list" className="btn btn-primary btn-lg px-4 shadow-sm">
                            <i className="fa-solid fa-users me-2"></i> Ver contactos
                        </Link>
                        {/* Botón que conecta con ContactForm */}
                        <Link to="/create" className="btn btn-outline-secondary btn-lg px-4 shadow-sm bg-white">
                            <i className="fa-solid fa-user-plus me-2"></i> Agregar Nuevo Contacto
                        </Link>
					</div>
				</div>
			</div>
            
            {/* Tarjetas informativas  */}
            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-3 hover-effect">
                        <div className="card-body">
                            <i className="fa-solid fa-bolt text-warning fa-3x mb-3"></i>
                            <h4 className="card-title">Rápido & Responsivo</h4>
                            <p className="card-text text-muted">Disfruta de una experiencia fluida en todos tus dispositivos con actualizaciones instantáneas..</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-3">
                        <div className="card-body">
                            <i className="fa-solid fa-database text-success fa-3x mb-3"></i>
                            <h4 className="card-title">API Integration</h4>
                            <p className="card-text text-muted">Sus datos se almacenan de forma segura y se obtienen directamente desde una API REST segura..</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100 py-3">
                        <div className="card-body">
                            <i className="fa-solid fa-layer-group text-info fa-3x mb-3"></i>
                            <h4 className="card-title">Context API</h4>
                            <p className="card-text text-muted">Gestión global del estado de óptima calidad, manteniendo sus datos sincronizados.</p>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
};
