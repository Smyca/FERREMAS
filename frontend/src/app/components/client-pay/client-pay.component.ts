import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-pay',
  templateUrl: './client-pay.component.html',
  styleUrls: ['./client-pay.component.css']
})
export class ClientPayComponent implements OnInit {
  
  // Datos del carrito (normalmente vendrían de un servicio)
  cartItems: any[] = [
    {
      nombre: 'Taladro Eléctrico',
      marca: 'Bosch',
      precio: 45000,
      quantity: 1,
      codigoProducto: 'TAL001'
    },
    {
      nombre: 'Martillo',
      marca: 'Stanley',
      precio: 12000,
      quantity: 2,
      codigoProducto: 'MAR001'
    }
  ];

  selectedCurrency: string = 'CLP';

  // Tipo de entrega
  deliveryType: string = 'pickup';
  deliveryAddress: string = '';
  deliveryCity: string = '';
  deliveryRegion: string = '';

  // Método de pago
  paymentMethod: string = 'debit';

  // Datos de tarjeta
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardName: string = '';

  // Transferencia
  transferReference: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Aquí normalmente obtendrías los datos del carrito desde un servicio
  }

  goBack(): void {
    this.router.navigate(['/view-client-products']);
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  }

  getFinalTotal(): number {
    let total = this.getTotal();
    if (this.deliveryType === 'delivery') {
      total += 5000; // Costo de envío
    }
    return total;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  isFormValid(): boolean {
    // Validar tipo de entrega
    if (this.deliveryType === 'delivery') {
      if (!this.deliveryAddress || !this.deliveryCity || !this.deliveryRegion) {
        return false;
      }
    }

    // Validar método de pago
    if (this.paymentMethod === 'debit' || this.paymentMethod === 'credit') {
      if (!this.cardNumber || !this.expiryDate || !this.cvv || !this.cardName) {
        return false;
      }
    }

    if (this.paymentMethod === 'transfer') {
      if (!this.transferReference) {
        return false;
      }
    }

    return true;
  }

  processPayment(): void {
    if (!this.isFormValid()) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    const orderData = {
      items: this.cartItems,
      delivery: {
        type: this.deliveryType,
        address: this.deliveryAddress,
        city: this.deliveryCity,
        region: this.deliveryRegion
      },
      payment: {
        method: this.paymentMethod,
        card: this.paymentMethod !== 'transfer' ? {
          number: this.cardNumber,
          expiry: this.expiryDate,
          cvv: this.cvv,
          name: this.cardName
        } : null,
        transferReference: this.transferReference
      },
      total: this.getFinalTotal()
    };

    console.log('Procesando pedido:', orderData);
    
    // Simular procesamiento
    alert('¡Pedido procesado exitosamente! Te enviaremos un email con los detalles.');
    
    // Redireccionar o limpiar carrito
    this.router.navigate(['/view-client-products']);
  }
}
