package com.ferremas.repository;

import com.ferremas.model.Mensaje;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MensajeRepository implements PanacheRepository<Mensaje> {
}
