import { useState, useEffect } from "react";

export function useModal(initialState = false) {
    const [isModalOpen, setModalOpen] = useState(initialState);

    useEffect(() => {
        setModalOpen(true); // Mostrar modal al inicio
    }, []);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto"; // Limpieza al desmontar
        };
    }, [isModalOpen]);

    return { isModalOpen, setModalOpen };
}

