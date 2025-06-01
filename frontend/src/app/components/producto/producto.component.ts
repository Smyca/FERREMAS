
import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  productoNuevo: Producto = this.resetProducto();
  productoSeleccionado: Producto | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  agregarProducto(): void {
    this.productoService.agregarProducto(this.productoNuevo).subscribe(() => {
      this.cargarProductos();
      this.productoNuevo = this.resetProducto();
    });
  }

  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = { ...producto };
  }

  actualizarProducto(): void {
    if (!this.productoSeleccionado) return;

    this.productoService
      .actualizarProducto(this.productoSeleccionado.codigoProducto, this.productoSeleccionado)
      .subscribe(() => {
        this.cargarProductos();
        this.productoSeleccionado = null;
      });
  }

  eliminarProducto(codigo: string): void {
    this.productoService.eliminarProducto(codigo).subscribe(() => {
      this.cargarProductos();
    });
  }

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
}