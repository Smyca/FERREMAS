import { Component, OnInit, HostListener } from '@angular/core';

interface OrdenDespacho {
  id: number;
  pedidoId: number;
  cliente: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaEntrega: Date;
  fechaCreacion: Date;
  estado: 'pendiente' | 'asignado' | 'en_preparacion' | 'despachado' | 'entregado' | 'cancelado';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  bodeguero?: string;
  transportista?: string;
  vehiculo?: string;
  productos: {
    nombre: string;
    cantidad: number;
    ubicacion: string;
    categoria: string;
  }[];
  observaciones?: string;
  total: number;
}

interface Bodeguero {
  id: number;
  nombre: string;
  disponible: boolean;
  ordenes_activas: number;
  especialidad: string;
}

interface Transportista {
  id: number;
  nombre: string;
  vehiculo: string;
  disponible: boolean;
  ordenes_activas: number;
  zona: string;
}

@Component({
  selector: 'app-gestion-despachos',
  templateUrl: './gestion-despachos.component.html',
  styleUrl: './gestion-despachos.component.css'
})
export class GestionDespachosComponent implements OnInit {
  ordenes: OrdenDespacho[] = [];
  bodegueros: Bodeguero[] = [];
  transportistas: Transportista[] = [];
  filtroEstado: string = 'todos';
  filtroPrioridad: string = 'todos';
  busqueda: string = '';
  ordenSeleccionada?: OrdenDespacho;
  dropdownAbierto: number | null = null;

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Datos de ejemplo para bodegueros
    this.bodegueros = [
      { id: 1, nombre: 'Carlos Sánchez', disponible: true, ordenes_activas: 3, especialidad: 'Herramientas' },
      { id: 2, nombre: 'Ana Morales', disponible: true, ordenes_activas: 1, especialidad: 'Materiales' },
      { id: 3, nombre: 'Luis Fernández', disponible: false, ordenes_activas: 5, especialidad: 'Maquinaria' },
      { id: 4, nombre: 'Patricia Silva', disponible: true, ordenes_activas: 2, especialidad: 'General' }
    ];

    // Datos de ejemplo para transportistas
    this.transportistas = [
      { id: 1, nombre: 'Pedro Ramírez', vehiculo: 'Camión 3.5T', disponible: true, ordenes_activas: 2, zona: 'Zona Norte' },
      { id: 2, nombre: 'Sofía López', vehiculo: 'Van Cargo', disponible: true, ordenes_activas: 1, zona: 'Zona Sur' },
      { id: 3, nombre: 'Diego Herrera', vehiculo: 'Motocicleta', disponible: false, ordenes_activas: 4, zona: 'Centro' },
      { id: 4, nombre: 'Carmen Ruiz', vehiculo: 'Camioneta', disponible: true, ordenes_activas: 0, zona: 'Zona Oriente' }
    ];

    // Datos de ejemplo para órdenes
    this.ordenes = [
      {
        id: 1,
        pedidoId: 101,
        cliente: 'Constructora Los Andes',
        direccion: 'Av. Providencia 1234, Santiago',
        telefono: '+56912345678',
        email: 'compras@losandes.cl',
        fechaCreacion: new Date('2025-07-10'),
        fechaEntrega: new Date('2025-07-12'),
        estado: 'pendiente',
        prioridad: 'alta',
        total: 850000,
        productos: [
          { nombre: 'Martillo Profesional 500g', cantidad: 10, ubicacion: 'Pasillo A, Estante 3', categoria: 'Herramientas' },
          { nombre: 'Destornillador Set Phillips', cantidad: 5, ubicacion: 'Pasillo B, Estante 1', categoria: 'Herramientas' },
          { nombre: 'Taladro Inalámbrico 18V', cantidad: 2, ubicacion: 'Pasillo C, Estante 2', categoria: 'Máquinas' }
        ],
        observaciones: 'Entrega urgente - Cliente VIP'
      },
      {
        id: 2,
        pedidoId: 102,
        cliente: 'Ferretería El Clavo',
        direccion: 'Los Leones 567, Las Condes',
        telefono: '+56987654321',
        email: 'pedidos@elclavo.cl',
        fechaCreacion: new Date('2025-07-11'),
        fechaEntrega: new Date('2025-07-13'),
        estado: 'asignado',
        prioridad: 'media',
        bodeguero: 'Carlos Sánchez',
        total: 450000,
        productos: [
          { nombre: 'Tornillos Madera 3x25mm', cantidad: 500, ubicacion: 'Pasillo D, Estante 4', categoria: 'Fijaciones' },
          { nombre: 'Adhesivo Construcción', cantidad: 12, ubicacion: 'Pasillo E, Estante 1', categoria: 'Químicos' }
        ]
      },
      {
        id: 3,
        pedidoId: 103,
        cliente: 'Maestro Constructor SpA',
        direccion: 'Santa María 890, Providencia',
        telefono: '+56965432178',
        email: 'compras@maestro.cl',
        fechaCreacion: new Date('2025-07-09'),
        fechaEntrega: new Date('2025-07-11'),
        estado: 'en_preparacion',
        prioridad: 'urgente',
        bodeguero: 'Ana Morales',
        transportista: 'Pedro Ramírez',
        vehiculo: 'Camión 3.5T',
        total: 1200000,
        productos: [
          { nombre: 'Sierra Circular 1400W', cantidad: 3, ubicacion: 'Pasillo F, Estante 3', categoria: 'Máquinas' },
          { nombre: 'Nivel Láser Rotativo', cantidad: 1, ubicacion: 'Pasillo G, Estante 2', categoria: 'Medición' }
        ],
        observaciones: 'Requiere manipulación especial - equipos delicados'
      },
      {
        id: 4,
        pedidoId: 104,
        cliente: 'Reparaciones Express',
        direccion: 'Manuel Montt 456, Ñuñoa',
        telefono: '+56956789012',
        email: 'info@repexpress.cl',
        fechaCreacion: new Date('2025-07-08'),
        fechaEntrega: new Date('2025-07-10'),
        estado: 'despachado',
        prioridad: 'baja',
        bodeguero: 'Luis Fernández',
        transportista: 'Sofía López',
        vehiculo: 'Van Cargo',
        total: 150000,
        productos: [
          { nombre: 'Llaves Inglesas Set', cantidad: 2, ubicacion: 'Pasillo A, Estante 1', categoria: 'Herramientas' }
        ]
      }
    ];
  }

  asignarBodeguero(orden: OrdenDespacho, bodegueroId: number) {
    const bodeguero = this.bodegueros.find(b => b.id === bodegueroId);
    if (bodeguero && bodeguero.disponible) {
      orden.bodeguero = bodeguero.nombre;
      orden.estado = 'asignado';
      bodeguero.ordenes_activas++;
      this.cerrarDropdown();
      console.log(`Bodeguero ${bodeguero.nombre} asignado a orden ${orden.id}`);
    }
  }

  asignarTransportista(orden: OrdenDespacho, transportistaId: number) {
    const transportista = this.transportistas.find(t => t.id === transportistaId);
    if (transportista && transportista.disponible) {
      orden.transportista = transportista.nombre;
      orden.vehiculo = transportista.vehiculo;
      if (orden.estado === 'asignado') {
        orden.estado = 'en_preparacion';
      }
      transportista.ordenes_activas++;
      this.cerrarDropdown();
      console.log(`Transportista ${transportista.nombre} asignado a orden ${orden.id}`);
    }
  }

  cambiarEstado(orden: OrdenDespacho, nuevoEstado: string) {
    orden.estado = nuevoEstado as any;
    console.log(`Orden ${orden.id} cambió a estado: ${nuevoEstado}`);
  }

  toggleDropdown(ordenId: number) {
    this.dropdownAbierto = this.dropdownAbierto === ordenId ? null : ordenId;
  }

  cerrarDropdown() {
    this.dropdownAbierto = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.cerrarDropdown();
  }

  get ordenesFiltradas() {
    let resultado = this.ordenes;
    
    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter(o => o.estado === this.filtroEstado);
    }
    
    if (this.filtroPrioridad !== 'todos') {
      resultado = resultado.filter(o => o.prioridad === this.filtroPrioridad);
    }
    
    if (this.busqueda) {
      resultado = resultado.filter(o => 
        o.cliente.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        o.bodeguero?.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        o.transportista?.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        o.id.toString().includes(this.busqueda)
      );
    }
    
    return resultado;
  }

  getContadorPorEstado(estado: string): number {
    return this.ordenes.filter(orden => orden.estado === estado).length;
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'pendiente': return 'badge-pending';
      case 'asignado': return 'badge-assigned';
      case 'en_preparacion': return 'badge-preparing';
      case 'despachado': return 'badge-dispatched';
      case 'entregado': return 'badge-delivered';
      case 'cancelado': return 'badge-cancelled';
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

  seleccionarOrden(orden: OrdenDespacho) {
    this.ordenSeleccionada = orden;
  }

  getBodeguerosDisponibles() {
    return this.bodegueros.filter(b => b.disponible && b.ordenes_activas < 5);
  }

  getTransportistasDisponibles() {
    return this.transportistas.filter(t => t.disponible && t.ordenes_activas < 3);
  }

  getTotalProductos(orden: OrdenDespacho): number {
    return orden.productos.reduce((total, producto) => total + producto.cantidad, 0);
  }
}
