import { useEffect } from "react";
import { motion } from "framer-motion";
import '../styles/ModalLoading.css'; // Importar el CSS

export default function LoadingModal({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Cierra el modal después de 2 segundos
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="modal-container"
      >
        {/* Spinner de carga */}
        <div className="timer">
        <div className="spinner"></div>

        {/* Texto */}
        <div className="loading-text">
        Buscando
        </div>
        </div>
        
      </motion.div>
    </div>
  );
}
