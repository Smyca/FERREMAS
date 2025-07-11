import { Component, OnInit } from '@angular/core';

interface Pedido {
  id: number;
  cliente: string;
  fechaPedido: Date;
  fechaLimite: Date;
  estado: 'nuevo' | 'en_preparacion' | 'listo' | 'entregado';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  total: number;
  productos: {
    id: number;
    nombre: string;
    cantidad: number;
    ubicacion: string;
    preparado: boolean;
  }[];
}

@Component({
  selector: 'app-bod-pedidos',
  templateUrl: './bod-pedidos.component.html',
  styleUrl: './bod-pedidos.component.css'
})
export class BodPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoSeleccionado?: Pedido;
  filtroEstado: string = 'todos';
  busqueda: string = '';

  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    // Datos de ejemplo
    this.pedidos = [
      {
        id: 1,
        cliente: 'Constructora Los Andes',
        fechaPedido: new Date('2025-07-10'),
        fechaLimite: new Date('2025-07-12'),
        estado: 'nuevo',
        prioridad: 'alta',
        total: 850000,
        productos: [
          { id: 1, nombre: 'Martillo Profesional', cantidad: 5, ubicacion: 'A-3-15', preparado: false },
          { id: 2, nombre: 'Destornillador Set', cantidad: 3, ubicacion: 'B-1-8', preparado: false },
          { id: 3, nombre: 'Taladro Inalámbrico', cantidad: 2, ubicacion: 'C-2-12', preparado: false }
        ]
      },
      {
        id: 2,
        cliente: 'Ferretería El Clavo',
        fechaPedido: new Date('2025-07-11'),
        fechaLimite: new Date('2025-07-13'),
        estado: 'en_preparacion',
        prioridad: 'media',
        total: 450000,
        productos: [
          { id: 4, nombre: 'Tornillos Madera', cantidad: 50, ubicacion: 'D-1-5', preparado: true },
          { id: 5, nombre: 'Clavos Concreto', cantidad: 25, ubicacion: 'D-2-3', preparado: false }
        ]
      },
      {
        id: 3,
        cliente: 'Maestro Constructor',
        fechaPedido: new Date('2025-07-09'),
        fechaLimite: new Date('2025-07-11'),
        estado: 'listo',
        prioridad: 'urgente',
        total: 1200000,
        productos: [
          { id: 6, nombre: 'Sierra Circular', cantidad: 1, ubicacion: 'E-1-1', preparado: true },
          { id: 7, nombre: 'Nivel Láser', cantidad: 2, ubicacion: 'E-2-4', preparado: true }
        ]
      }
    ];
  }

  aceptarPedido(pedido: Pedido) {
    pedido.estado = 'en_preparacion';
  }

  marcarProductoPreparado(pedido: Pedido, producto: any) {
    producto.preparado = !producto.preparado;
    
    // Verificar si todos los productos están preparados
    const todosPreparados = pedido.productos.every(p => p.preparado);
    if (todosPreparados && pedido.estado === 'en_preparacion') {
      pedido.estado = 'listo';
    }
  }

  get pedidosFiltrados() {
    let resultado = this.pedidos;
    
    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter(p => p.estado === this.filtroEstado);
    }
    
    if (this.busqueda) {
      resultado = resultado.filter(p => 
        p.cliente.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        p.id.toString().includes(this.busqueda)
      );
    }
    
    return resultado;
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'nuevo': return 'badge-new';
      case 'en_preparacion': return 'badge-progress';
      case 'listo': return 'badge-ready';
      case 'entregado': return 'badge-delivered';
      default: return 'badge-secondary';
    }
  }

  getPrioridadClass(prioridad: string): string {
    switch (prioridad) {
      case 'baja': return 'priority-low';
      case 'media': return 'priority-medium';
      case 'alta': return 'priority-high';
      case 'urgente': return 'priority-urgent';
      default: return '';
    }
  }

  getDiasRestantes(fechaLimite: Date): number {
    const hoy = new Date();
    const limite = new Date(fechaLimite);
    const diferencia = limite.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  seleccionarPedido(pedido: Pedido) {
    this.pedidoSeleccionado = pedido;
  }

  getProgresoPreparacion(pedido: Pedido): number {
    const preparados = pedido.productos.filter(p => p.preparado).length;
    return (preparados / pedido.productos.length) * 100;
  }
}