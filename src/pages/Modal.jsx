
import '../styles/Modal.css'

// eslint-disable-next-line react/prop-types
function Modal({ isOpen, onClose }) {
    if (!isOpen) return null; // No renderiza el modal si no está abierto

    return (
        <div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true"
            style={{ 
                position: "fixed", 
                top: "0", 
                left: "0", 
                width: "100vw", 
                height: "100vh", 
                backgroundColor: "rgba(0,0,0,0.5)", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                zIndex: 1050 
            }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content" >
                    <div className="modal-header" >
                        <h5 
                            className="modal-title" 
                            id="exampleModalLabel" 
                           
                        >
                            Mensaje Importante:
                        </h5>
                    </div>

                    <div className="modal-body" >
                        Las multas se reflejan en el sistema después de 24 horas de haber sido aplicadas de lunes a viernes;  
                        o después de 48 horas, si se aplicaron durante el fin de semana.
                        <br /><br />
                        Para liberación de vehículos detenidos, acudir previamente a la Dirección de Tránsito de Monterrey en 
                        Abraham Lincoln 300, esquina Refugio Velázquez, Col. Morelos CP 64330.
                        <br />
                        Para dudas sobre su adeudo, llámenos al <strong>81 8305 0900 Ext. 1978</strong>.
                        
                        <div className="row text-center" >
                            <p>¿Desea continuar en el sitio?</p>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <div className="rows w-100" >
                            <div className="col-sm-6" >
                                <button 
                                    type="button" 
                                    className="btn" 
                                    onClick={onClose}
                                >
                                    Sí
                                </button>
                            </div>
                            <div className="col-sm-6">
                                <button 
                                    type="button" 
                                    className="btn" 
                                    onClick={onClose}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
