package com.ferremas.service;

import com.ferremas.model.Mensaje;
import com.ferremas.repository.MensajeRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional; 

@ApplicationScoped
public class MensajeService {

    @Inject
    MensajeRepository mensajeRepository;
    @Transactional
    public Mensaje obtenerMensaje() {
        // Crear uno si no hay datos
        if (mensajeRepository.count() == 0) {
            Mensaje nuevo = new Mensaje();
            nuevo.texto = "¡Hola desde Quarkus!";
            mensajeRepository.persist(nuevo);
        }

        return mensajeRepository.findAll().firstResult();
    }
}
