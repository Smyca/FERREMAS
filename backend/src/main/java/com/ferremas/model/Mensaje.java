package com.ferremas.model;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Entity;

@Entity
public class Mensaje extends PanacheEntity {
    public String texto;
}
