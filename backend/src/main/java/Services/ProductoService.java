package Services;



import Model.Producto;

import Repository.ProductoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;

@ApplicationScoped
public class ProductoService {

    @Inject
    ProductoRepository productoRepository;

    public List<Producto> listarTodos() {
        return productoRepository.listAll();
    }

    public Producto obtenerPorCodigo(String codigo) {
        return productoRepository.findById(codigo);
    }

    public void agregarProducto(Producto producto) {
        productoRepository.persist(producto);
    }

    public void eliminarProducto(String codigo) {
        productoRepository.deleteById(codigo);
    }

    public void actualizarProducto(Producto producto) {
        // Si el producto existe, se actualiza. Si no, lo crea.
        productoRepository.persist(producto);
    }
}
