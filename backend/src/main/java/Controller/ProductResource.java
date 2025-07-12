package Controller;

import Model.Producto;
import Repository.ProductoRepository;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/productos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductoRepository productoRepository;

    // Obtener todos los productos
    @GET
    public List<Producto> getAll() {
        return productoRepository.listAll();
    }

    // Obtener producto por código (ID)
    @GET
    @Path("/{codigo}")
    public Response getById(@PathParam("codigo") String codigoProducto) {
        Producto producto = productoRepository.findById(codigoProducto);
        if (producto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(producto).build();
    }

    // Crear nuevo producto
    @POST
    @Transactional
    public Response create(Producto producto) {
        if (productoRepository.findById(producto.getCodigoProducto()) != null) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("El producto ya existe con código: " + producto.getCodigoProducto())
                    .build();
        }
        productoRepository.persist(producto);
        return Response.status(Response.Status.CREATED).entity(producto).build();
    }

    // Actualizar producto existente
    @PUT
    @Path("/{codigo}")
    @Transactional
    public Response update(@PathParam("codigo") String codigoProducto, Producto productoActualizado) {
        Producto producto = productoRepository.findById(codigoProducto);
        if (producto == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        // Actualizar campos (sin cambiar el código primario)
        producto.setNombre(productoActualizado.getNombre());
        producto.setDescripcion(productoActualizado.getDescripcion());
        producto.setMarca(productoActualizado.getMarca());
        producto.setCategoria(productoActualizado.getCategoria());
        producto.setPrecio(productoActualizado.getPrecio());
        producto.setStock(productoActualizado.getStock());
        producto.setImagenUrl(productoActualizado.getImagenUrl());
        producto.setFechaActualizacion(productoActualizado.getFechaActualizacion());

        return Response.ok(producto).build();
    }

    // Eliminar producto por código
    @DELETE
    @Path("/{codigo}")
    @Transactional
    public Response delete(@PathParam("codigo") String codigoProducto) {
        boolean eliminado = productoRepository.deleteById(codigoProducto);
        if (!eliminado) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}
