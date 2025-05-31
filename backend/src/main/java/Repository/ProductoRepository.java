package Repository;


import Model.Producto;
import jakarta.enterprise.context.ApplicationScoped;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

@ApplicationScoped
public class ProductoRepository implements PanacheRepositoryBase<Producto, String> {
}