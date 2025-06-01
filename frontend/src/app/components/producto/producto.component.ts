import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit {
  // =====================================
  // Propiedades del componente
  // =====================================
  productos: Producto[] = [];
  productoNuevo: Producto = this.resetProducto();
  productoSeleccionado: Producto = this.resetProducto();

  // Propiedades para el manejo de monedas
  monedasDisponibles: string[] = ['MXN', 'USD', 'EUR', 'CLP'];
  monedaSeleccionada: string = 'MXN';
  tasaConversion: number = 1;

  // Propiedades para modales
  modalVisible = false;
  modalTitle = '';
  modalConfirmacionVisible = false;
  productoAEliminar: Producto | null = null;

  @ViewChild('editarProductoModal') editarProductoModal!: ElementRef;

  // =====================================
  // Constructor e inicialización
  // =====================================
  constructor(private productoService: ProductoService, private http: HttpClient) {}

  ngOnInit() {
    this.cargarProductos();
    this.cambiarMoneda();
  }

  // =====================================
  // Métodos de carga de datos
  // =====================================
  cargarProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  cambiarMoneda() {
    if (this.monedaSeleccionada === 'MXN') {
      this.tasaConversion = 1;
      return;
    }
    // Usando exchangerate.host (gratis y sin API key)
    this.http.get<any>(`https://api.exchangerate.host/latest?base=MXN&symbols=${this.monedaSeleccionada}`)
      .subscribe(data => {
        this.tasaConversion = data.rates[this.monedaSeleccionada];
      });
  }

  // =====================================
  // Métodos para manejo del modal
  // =====================================
  abrirModalCrear(): void {
    this.productoSeleccionado = this.resetProducto();
    this.modalTitle = 'Nuevo Producto';
    this.modalVisible = true;
  }

  abrirModalEditar(producto: Producto): void {
    this.productoSeleccionado = { ...producto };
    this.modalTitle = 'Editar Producto';
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.productoSeleccionado = this.resetProducto();
  }

  // =====================================
  // Métodos de gestión de productos
  // =====================================
  guardarProducto(): void {
    if (!this.productoSeleccionado) return;

    console.log('Datos del producto antes de enviar:', this.productoSeleccionado);

    // Crear el objeto producto con los datos del formulario
    const productoParaEnviar = {
      codigoProducto: this.productoSeleccionado.codigoProducto,
      nombre: this.productoSeleccionado.nombre,
      descripcion: this.productoSeleccionado.descripcion || '',
      marca: this.productoSeleccionado.marca,
      categoria: this.productoSeleccionado.categoria,
      precio: Number(this.productoSeleccionado.precio),
      stock: Number(this.productoSeleccionado.stock)
    };

    console.log('Producto preparado para enviar:', productoParaEnviar);

    // Siempre usar el método agregarProducto para crear un nuevo producto
    this.productoService.agregarProducto(productoParaEnviar).subscribe({
      next: (response) => {
        console.log('Respuesta exitosa:', response);
        this.cargarProductos();
        this.cerrarModal();
      },
      error: (error) => {
        console.error('Error completo:', error);
        if (error.status === 404) {
          alert('Error en la URL del servidor. Contacte al administrador.');
        } else if (error.status === 409) {
          alert('Ya existe un producto con este código.');
        } else {
          alert('Error al crear el producto: ' + error.message);
        }
      }
    });
  }

  eliminarProducto(producto: Producto): void {
    this.productoAEliminar = producto;
    this.modalConfirmacionVisible = true;
  }

  confirmarEliminar(): void {
    if (this.productoAEliminar) {
      this.productoService.eliminarProducto(this.productoAEliminar.codigoProducto)
        .subscribe(() => {
          this.cargarProductos();
          this.cancelarEliminar();
        });
    }
  }

  cancelarEliminar(): void {
    this.modalConfirmacionVisible = false;
    this.productoAEliminar = null;
  }

  // =====================================
  // Métodos auxiliares
  // =====================================
  resetProducto(): Producto {
    return {
      codigoProducto: '',
      nombre: '',
      descripcion: '',
      marca: '',
      categoria: '',
      precio: 0,
      stock: 0,
    };
  }

  // Métodos auxiliares para las tarjetas
  getStockClass(stock: number): string {
    if (stock === 0) return 'stock-out';
    if (stock < 5) return 'stock-low';
    return 'stock-ok';
  }

  getStockText(stock: number): string {
    if (stock === 0) return 'Sin stock';
    if (stock < 5) return 'Poco stock';
    return 'En stock';
  }

  formatNumber(value: number): string {
    const convertido = value * this.tasaConversion;
    return convertido.toLocaleString('es-MX', { minimumFractionDigits: 2 });
  }

  // =====================================
  // Métodos de acceso desde HTML
  // =====================================
  seleccionarProducto(producto: Producto | string): void {
    if (typeof producto === 'string') {
        const foundProducto = this.productos.find(p => p.codigoProducto === producto);
        if (foundProducto) {
            this.productoSeleccionado = { ...foundProducto };
        }
    } else {
        this.productoSeleccionado = { ...producto };
    }
  }

  seleccionarProductoFromHtml(codigo: string): void {
    const producto = this.productos.find(p => p.codigoProducto === codigo);
    if (producto) this.seleccionarProducto(producto);
  }

  eliminarProductoFromHtml(codigo: string): void {
    const producto = this.productos.find(p => p.codigoProducto === codigo);
    if (producto) {
      this.eliminarProducto(producto);
    }
  }
}