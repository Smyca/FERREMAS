import { Component, OnInit, HostListener } from '@angular/core';

interface PedidoListo {
  id: number;
  cliente: string;
  fechaPreparacion: Date;
  fechaEntrega: Date;
  estado: 'listo' | 'asignado' | 'retirado' | 'en_transito';
  vendedorAsignado?: string;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  total: number;
  productos: {
    nombre: string;
    cantidad: number;
    preparado: boolean;
  }[];
  direccionEntrega: string;
  telefono: string;
}

interface Vendedor {
  id: number;
  nombre: string;
  disponible: boolean;
  pedidosActivos: number;
  especialidad: string;
}

@Component({
  selector: 'app-bod-despachos',
  templateUrl: './bod-despachos.component.html',
  styleUrl: './bod-despachos.component.css'
})
export class BodDespachosComponent implements OnInit {
  pedidosListos: PedidoListo[] = [];
  vendedores: Vendedor[] = [];
  pedidoSeleccionado?: PedidoListo;
  filtroEstado: string = 'todos';
  busqueda: string = '';
  dropdownAbierto: number | null = null; // Nueva propiedad

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Datos de ejemplo para vendedores
    this.vendedores = [
      { id: 1, nombre: 'Carlos Mendoza', disponible: true, pedidosActivos: 2, especialidad: 'Zona Norte' },
      { id: 2, nombre: 'María Elena', disponible: true, pedidosActivos: 1, especialidad: 'Zona Sur' },
      { id: 3, nombre: 'Roberto Silva', disponible: false, pedidosActivos: 5, especialidad: 'Zona Centro' },
      { id: 4, nombre: 'Ana Torres', disponible: true, pedidosActivos: 0, especialidad: 'Zona Oriente' }
    ];

    // Datos de ejemplo para pedidos listos
    this.pedidosListos = [
      {
        id: 1,
        cliente: 'Constructora Los Andes',
        fechaPreparacion: new Date('2025-07-11'),
        fechaEntrega: new Date('2025-07-12'),
        estado: 'listo',
        prioridad: 'alta',
        total: 850000,
        direccionEntrega: 'Av. Providencia 1234, Santiago',
        telefono: '+56912345678',
        productos: [
          { nombre: 'Martillo Profesional', cantidad: 5, preparado: true },
          { nombre: 'Destornillador Set', cantidad: 3, preparado: true },
          { nombre: 'Taladro Inalámbrico', cantidad: 2, preparado: true }
        ]
      },
      {
        id: 2,
        cliente: 'Ferretería El Clavo',
        fechaPreparacion: new Date('2025-07-11'),
        fechaEntrega: new Date('2025-07-13'),
        estado: 'asignado',
        vendedorAsignado: 'Carlos Mendoza',
        prioridad: 'media',
        total: 450000,
        direccionEntrega: 'Los Leones 567, Las Condes',
        telefono: '+56987654321',
        productos: [
          { nombre: 'Tornillos Madera', cantidad: 50, preparado: true },
          { nombre: 'Clavos Concreto', cantidad: 25, preparado: true }
        ]
      },
      {
        id: 3,
        cliente: 'Maestro Constructor',
        fechaPreparacion: new Date('2025-07-10'),
        fechaEntrega: new Date('2025-07-11'),
        estado: 'retirado',
        vendedorAsignado: 'María Elena',
        prioridad: 'urgente',
        total: 1200000,
        direccionEntrega: 'Santa María 890, Providencia',
        telefono: '+56965432178',
        productos: [
          { nombre: 'Sierra Circular', cantidad: 1, preparado: true },
          { nombre: 'Nivel Láser', cantidad: 2, preparado: true }
        ]
      }
    ];
  }

  toggleDropdown(pedidoId: number) {
    this.dropdownAbierto = this.dropdownAbierto === pedidoId ? null : pedidoId;
  }

  cerrarDropdown() {
    this.dropdownAbierto = null;
  }

  asignarVendedor(pedido: PedidoListo, vendedorId: number) {
    const vendedor = this.vendedores.find(v => v.id === vendedorId);
    if (vendedor && vendedor.disponible) {
      pedido.vendedorAsignado = vendedor.nombre;
      pedido.estado = 'asignado';
      vendedor.pedidosActivos++;
      this.cerrarDropdown(); // Cerrar dropdown después de asignar
      console.log(`Vendedor ${vendedor.nombre} asignado al pedido ${pedido.id}`);
    }
  }

  marcarComoRetirado(pedido: PedidoListo) {
    if (pedido.estado === 'asignado') {
      pedido.estado = 'retirado';
      console.log(`Pedido ${pedido.id} marcado como retirado`);
    }
  }

  get pedidosFiltrados() {
    let resultado = this.pedidosListos;
    
    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter(p => p.estado === this.filtroEstado);
    }
    
    if (this.busqueda) {
      resultado = resultado.filter(p => 
        p.cliente.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        p.vendedorAsignado?.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        p.id.toString().includes(this.busqueda)
      );
    }
    
    return resultado;
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'listo': return 'badge-ready';
      case 'asignado': return 'badge-assigned';
      case 'retirado': return 'badge-picked';
      case 'en_transito': return 'badge-transit';
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

  getDiasRestantes(fechaEntrega: Date): number {
    const hoy = new Date();
    const entrega = new Date(fechaEntrega);
    const diferencia = entrega.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 3600 * 24));
  }

  seleccionarPedido(pedido: PedidoListo) {
    this.pedidoSeleccionado = pedido;
  }

  getVendedoresDisponibles() {
    return this.vendedores.filter(v => v.disponible && v.pedidosActivos < 4);
  }

  getContadorPorEstado(estado: string): number {
    return this.pedidosListos.filter(pedido => pedido.estado === estado).length;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.cerrarDropdown();
  }
}
