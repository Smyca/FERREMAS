import { Component, OnInit } from '@angular/core';

interface Pedido {
  id: number;
  cliente: string;
  fecha: Date;
  fechaLimite: Date;
  total: number;
  estado: 'pendiente' | 'aprobado' | 'rechazado' | 'en_preparacion';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  vendedor: string;
  email: string;
  telefono: string;
  productos: {
    nombre: string;
    cantidad: number;
    precio: number;
    categoria: string;
  }[];
  observaciones?: string;
}

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrl: './gestion-pedidos.component.css'
})
export class GestionPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  filtroEstado: string = 'todos';
  filtroPrioridad: string = 'todos';
  busqueda: string = '';
  pedidoSeleccionado?: Pedido;
  motivoRechazo: string = '';
  
  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidos = [
      {
        id: 1,
        cliente: 'Constructora Los Andes',
        vendedor: 'Carlos Mendoza',
        email: 'compras@losandes.cl',
        telefono: '+56912345678',
        fecha: new Date('2025-07-10'),
        fechaLimite: new Date('2025-07-15'),
        total: 850000,
        estado: 'pendiente',
        prioridad: 'alta',
        productos: [
          { nombre: 'Martillo Profesional 500g', cantidad: 10, precio: 25000, categoria: 'Herramientas' },
          { nombre: 'Destornillador Set Phillips', cantidad: 5, precio: 15000, categoria: 'Herramientas' },
          { nombre: 'Taladro Inalámbrico 18V', cantidad: 2, precio: 180000, categoria: 'Máquinas' }
        ],
        observaciones: 'Entrega urgente para proyecto en Las Condes'
      },
      {
        id: 2,
        cliente: 'Ferretería El Clavo',
        vendedor: 'María Elena',
        email: 'pedidos@elclavo.cl', 
        telefono: '+56987654321',
        fecha: new Date('2025-07-11'),
        fechaLimite: new Date('2025-07-20'),
        total: 450000,
        estado: 'pendiente',
        prioridad: 'media',
        productos: [
          { nombre: 'Tornillos Madera 3x25mm', cantidad: 500, precio: 200, categoria: 'Fijaciones' },
          { nombre: 'Clavos Concreto 4x40mm', cantidad: 200, precio: 350, categoria: 'Fijaciones' },
          { nombre: 'Adhesivo Construcción', cantidad: 12, precio: 8500, categoria: 'Químicos' }
        ]
      },
      {
        id: 3,
        cliente: 'Maestro Constructor SpA',
        vendedor: 'Roberto Silva',
        email: 'compras@maestro.cl',
        telefono: '+56965432178',
        fecha: new Date('2025-07-09'),
        fechaLimite: new Date('2025-07-12'),
        total: 1200000,
        estado: 'aprobado',
        prioridad: 'urgente',
        productos: [
          { nombre: 'Sierra Circular 1400W', cantidad: 3, precio: 150000, categoria: 'Máquinas' },
          { nombre: 'Nivel Láser Rotativo', cantidad: 1, precio: 380000, categoria: 'Medición' },
          { nombre: 'Escalera Telescópica 4m', cantidad: 2, precio: 85000, categoria: 'Acceso' }
        ],
        observaciones: 'Cliente VIP - procesamiento prioritario'
      },
      {
        id: 4,
        cliente: 'Reparaciones Rápidas',
        vendedor: 'Ana Torres',
        email: 'info@reparapidas.cl',
        telefono: '+56956789012',
        fecha: new Date('2025-07-08'),
        fechaLimite: new Date('2025-07-10'),
        total: 75000,
        estado: 'rechazado',
        prioridad: 'baja',
        productos: [
          { nombre: 'Llaves Inglesas Set', cantidad: 1, precio: 35000, categoria: 'Herramientas' },
          { nombre: 'Alicate Universal 8"', cantidad: 2, precio: 20000, categoria: 'Herramientas' }
        ]
      }
    ];
  }

  aprobarPedido(pedido: Pedido) {
    pedido.estado = 'aprobado';
    console.log(`Pedido ${pedido.id} aprobado`);
  }

  rechazarPedido(pedido: Pedido, motivo?: string) {
    pedido.estado = 'rechazado';
    if (motivo) {
      pedido.observaciones = `Rechazado: ${motivo}`;
    }
    console.log(`Pedido ${pedido.id} rechazado`);
  }

  enviarAPreparacion(pedido: Pedido) {
    pedido.estado = 'en_preparacion';
    console.log(`Pedido ${pedido.id} enviado a preparación`);
  }

  seleccionarPedido(pedido: Pedido) {
    this.pedidoSeleccionado = pedido;
  }

  get pedidosFiltrados() {
    let resultado = this.pedidos;
    
    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter(p => p.estado === this.filtroEstado);
    }
    
    if (this.filtroPrioridad !== 'todos') {
      resultado = resultado.filter(p => p.prioridad === this.filtroPrioridad);
    }
    
    if (this.busqueda) {
      resultado = resultado.filter(p => 
        p.cliente.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        p.vendedor.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        p.id.toString().includes(this.busqueda)
      );
    }
    
    return resultado;
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'badge-pending';
      case 'aprobado': return 'badge-approved';
      case 'rechazado': return 'badge-rejected';
      case 'en_preparacion': return 'badge-preparing';
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

  getContadorPorEstado(estado: string): number {
    return this.pedidos.filter(pedido => pedido.estado === estado).length;
  }

  getTotalProductos(pedido: Pedido): number {
    return pedido.productos.reduce((total, producto) => total + producto.cantidad, 0);
  }
}
