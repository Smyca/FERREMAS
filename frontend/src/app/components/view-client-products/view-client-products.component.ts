import { Component } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto.service';
import { HttpClient } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-view-client-products',
  templateUrl: './view-client-products.component.html',
  styleUrls: ['./view-client-products.component.css']
})
export class ViewClientProductsComponent implements OnInit, AfterViewInit {
 // =====================================
  // Propiedades del componente
  // =====================================
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  productoNuevo: Producto = this.resetProducto();
  productoSeleccionado: Producto = this.resetProducto();

  // Propiedades para el manejo de monedas
  monedasDisponibles: string[] = ['MXN', 'USD', 'EUR', 'CLP'];
  monedaSeleccionada: string = 'CLP';
  tasaConversion: number = 1;

  // Propiedades para modales
  modalVisible = false;
  modalTitle = '';
  modalConfirmacionVisible = false;
  productoAEliminar: Producto | null = null;

  // Propiedades para búsqueda
  searchTerm: string = '';
  selectedCategory: string = '';

  // Propiedades del carrito
  cartItems: any[] = [];
  cartModalVisible: boolean = false;

  @ViewChild('editarProductoModal') editarProductoModal!: ElementRef;
  @ViewChild('paypalElement') paypalElement!: ElementRef;

  // =====================================
  // Constructor e inicialización
  // =====================================
  constructor(private productoService: ProductoService, private http: HttpClient) {}

  ngOnInit() {
    this.cargarProductos();
    this.cambiarMoneda();
  }

  ngAfterViewInit(): void {
    this.initPayPalButton();
  }

  // =====================================
  // Métodos de carga de datos
  // =====================================
  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data: Producto[]) => {
        console.log('Productos cargados:', data);
        this.productos = data;
        this.productosFiltrados = [...this.productos]; // Inicializar productos filtrados
        this.searchProducts(); // Aplicar filtros si existen
      },
      error: (error: any) => {
        console.error('Error al cargar productos:', error);
        this.productos = [];
        this.productosFiltrados = [];
      }
    });
  }
  cambiarMoneda() {
    if (this.monedaSeleccionada === 'CLP') {
      this.tasaConversion = 1;
      return;
    }

    // Obtener tasas actualizadas de la API
    console.log('Consultando API de tipos de cambio...');
    this.http.get<any>('https://open.er-api.com/v6/latest/CLP')
      .subscribe({
        next: (data) => {
          if (data && data.rates && data.rates[this.monedaSeleccionada]) {
            this.tasaConversion = data.rates[this.monedaSeleccionada];
            console.log('✅ API de tipos de cambio funcionando correctamente');
            console.log(`💱 Tasa de cambio para ${this.monedaSeleccionada}:`, this.tasaConversion);
            console.log('📊 Tasas disponibles:', data.rates);
          } else {
            console.warn('⚠️ No se encontró la tasa para', this.monedaSeleccionada);
            console.log('Respuesta de la API:', data);
            this.tasaConversion = 1; // Valor por defecto si no se encuentra la tasa
          }
        },
        error: (error) => {
          console.error('❌ Error al consultar la API de tipos de cambio:');
          console.error('Código de error:', error.status);
          console.error('Mensaje:', error.message);
          this.tasaConversion = 1; // Valor por defecto en caso de error
        }
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

    const productoParaEnviar = {
      codigoProducto: this.productoSeleccionado.codigoProducto,
      nombre: this.productoSeleccionado.nombre,
      descripcion: this.productoSeleccionado.descripcion || '',
      marca: this.productoSeleccionado.marca,
      categoria: this.productoSeleccionado.categoria,
      precio: Number(this.productoSeleccionado.precio),
      stock: Number(this.productoSeleccionado.stock)
    };

    console.log('Operación:', this.modalTitle);
    console.log('Producto a enviar:', productoParaEnviar);

    // Verificar si estamos creando o editando según el título del modal
    if (this.modalTitle === 'Nuevo Producto') {
      // Crear nuevo producto
      this.productoService.agregarProducto(productoParaEnviar).subscribe({
        next: (response: any) => {
          console.log('Producto creado:', response);
          this.cargarProductos();
          this.cerrarModal();
        },
        error: (error: any) => {
          console.error('Error al crear:', error);
          if (error.status === 409) {
            alert('Ya existe un producto con este código.');
          } else {
            alert('Error al crear el producto: ' + error.message);
          }
        }
      });
    } else {
      // Actualizar producto existente
      this.productoService.actualizarProducto(productoParaEnviar.codigoProducto, productoParaEnviar).subscribe({
        next: (response: any) => {
          console.log('Producto actualizado:', response);
          this.cargarProductos();
          this.cerrarModal();
        },
        error: (error: any) => {
          console.error('Error al actualizar:', error);
          if (error.status === 404) {
            alert('No se encontró el producto para actualizar.');
          } else {
            alert('Error al actualizar el producto: ' + error.message);
          }
        }
      });
    }
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
    try {
      const convertido = Math.round(value * this.tasaConversion);
      // Usar 'es' como locale base y formatear como entero
      return new Intl.NumberFormat('es-ES', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(convertido);
    } catch (error) {
      console.error('Error al formatear número:', error);
      return Math.round(value).toString(); // Retornar el valor redondeado sin formato en caso de error
    }
  }

  private initPayPalButton(): void {
    if (!this.paypalElement || !this.paypalElement.nativeElement) {
      console.error('PayPal element not found');
      return;
    }

    const paypal = (window as any).paypal;
    if (!paypal) {
      console.error('PayPal SDK not loaded');
      return;
    }

    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '10.00' // Monto fijo de $10 USD
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by', details.payer.name.given_name);
          alert('Pago completado! Gracias ' + details.payer.name.given_name);
        });
      },
      onError: (err: any) => {
        console.error('PayPal Error:', err);
        alert('Hubo un error al procesar el pago. Por favor, intente nuevamente.');
      }
    }).render(this.paypalElement.nativeElement);
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

  // =====================================
  // Métodos de búsqueda
  // =====================================
  searchProducts(): void {
    // Si no hay productos, no hacer nada
    if (!this.productos) {
      this.productosFiltrados = [];
      return;
    }

    // Comenzar con todos los productos
    let results = [...this.productos];

    // Aplicar filtro de búsqueda si hay término de búsqueda
    if (this.searchTerm.trim()) {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      results = results.filter(product =>
        product.nombre.toLowerCase().includes(searchTermLower) ||
        product.marca.toLowerCase().includes(searchTermLower) ||
        product.descripcion?.toLowerCase().includes(searchTermLower) ||
        product.codigoProducto.toLowerCase().includes(searchTermLower)
      );
    }

    // Aplicar filtro de categoría si hay una seleccionada
    if (this.selectedCategory) {
      results = results.filter(product => 
        product.categoria === this.selectedCategory
      );
    }

    // Actualizar productos filtrados
    this.productosFiltrados = results;
    console.log('Productos filtrados:', this.productosFiltrados.length);
  }

  // =====================================
  // Métodos del carrito
  // =====================================
  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.codigoProducto === product.codigoProducto);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1
      });
    }
  }

  removeFromCart(product: any) {
    const index = this.cartItems.findIndex(item => item.codigoProducto === product.codigoProducto);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeFromCart(item);
    }
  }

  getTotalItemsInCart(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  }

  toggleCart() {
    this.cartModalVisible = !this.cartModalVisible;
  }

  clearCart() {
    this.cartItems = [];
    this.cartModalVisible = false;
  }

  proceedToCheckout() {
    // Aquí puedes implementar la lógica para proceder al pago
    console.log('Proceder al pago:', this.cartItems);
    alert('Función de pago en desarrollo...');
  }
}
