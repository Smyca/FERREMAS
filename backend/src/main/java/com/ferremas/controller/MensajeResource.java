package com.ferremas.controller;

import com.ferremas.model.Mensaje;
import com.ferremas.service.MensajeService;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/mensaje")
public class MensajeResource {

    @Inject
    MensajeService mensajeService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Mensaje hello() {
        return mensajeService.obtenerMensaje();
    }
}
