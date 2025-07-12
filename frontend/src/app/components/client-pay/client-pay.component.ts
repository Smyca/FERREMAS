import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare var paypal: any;

@Component({
  selector: 'app-client-pay',
  templateUrl: './client-pay.component.html',
  styleUrls: ['./client-pay.component.css']
})
export class ClientPayComponent implements OnInit, AfterViewInit {

  @ViewChild('paypalElement', { static: false }) paypalElement!: ElementRef;

  cartItems: any[] = [];
  selectedCurrency: string = 'CLP';
  
  // Datos del formulario
  deliveryType: string = 'pickup';
  deliveryAddress: string = '';
  deliveryCity: string = '';
  deliveryRegion: string = '';
  
  paymentMethod: string = 'debit';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardName: string = '';
  transferReference: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCartData();
    if (this.cartItems.length === 0) {
      alert('No hay productos en el carrito');
      this.router.navigate(['/products']);
    }
  }

  ngAfterViewInit() {
    // Solo cargar PayPal si el método de pago es PayPal
    if (this.paymentMethod === 'paypal') {
      this.loadPayPalScript();
    }
  }

  loadCartData() {
    const cartItemsData = localStorage.getItem('cartItems');
    const currencyData = localStorage.getItem('selectedCurrency');

    if (cartItemsData) {
      this.cartItems = JSON.parse(cartItemsData);
    }
    if (currencyData) {
      this.selectedCurrency = currencyData;
    }
  }

  onPaymentMethodChange() {
    if (this.paymentMethod === 'paypal') {
      setTimeout(() => {
        this.loadPayPalScript();
      }, 100);
    }
  }

  loadPayPalScript() {
    if (typeof paypal !== 'undefined') {
      this.renderPayPalButton();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AQOzW3wDUZS9nWOx0dEcgOdKw8-w8CtdgrGpLXMiKo5VNvQ6TkZfP46C9XZQz_PjXGzp1cI8-xXmqILJ&currency=USD';
    script.onload = () => {
      this.renderPayPalButton();
    };
    document.head.appendChild(script);
  }

  renderPayPalButton() {
    if (this.paypalElement && this.paypalElement.nativeElement) {
      // Limpiar contenido previo
      this.paypalElement.nativeElement.innerHTML = '';

      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.convertToUSD(this.getFinalTotal()).toFixed(2),
                currency_code: 'USD'
              },
              description: `Compra FERREMAS - ${this.cartItems.length} productos`
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert(`Pago completado por ${details.payer.name.given_name}!`);
            this.clearCartAfterPayment();
            this.router.navigate(['/products']);
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago:', err);
          alert('Error al procesar el pago');
        },
        onCancel: (data: any) => {
          alert('Pago cancelado');
        }
      }).render(this.paypalElement.nativeElement);
    }
  }

  convertToUSD(amount: number): number {
    // Conversión simple - en producción usarías una API de tipos de cambio
    switch (this.selectedCurrency) {
      case 'CLP':
        return amount / 800; // Aproximadamente 800 CLP = 1 USD
      case 'EUR':
        return amount * 1.1; // Aproximadamente 1 EUR = 1.1 USD
      case 'USD':
      default:
        return amount;
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  }

  getFinalTotal(): number {
    let total = this.getTotal();
    if (this.deliveryType === 'delivery') {
      total += 5000; // Costo de envío en CLP
    }
    return total;
  }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('es-CL').format(num);
  }

  isFormValid(): boolean {
    if (this.deliveryType === 'delivery') {
      if (!this.deliveryAddress || !this.deliveryCity || !this.deliveryRegion) {
        return false;
      }
    }

    switch (this.paymentMethod) {
      case 'debit':
      case 'credit':
        return !!(this.cardNumber && this.expiryDate && this.cvv && this.cardName);
      case 'transfer':
        return !!this.transferReference;
      case 'paypal':
        return true; // PayPal maneja su propia validación
      default:
        return false;
    }
  }

  processPayment() {
    if (!this.isFormValid()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (this.paymentMethod === 'paypal') {
      // PayPal se maneja con sus propios botones
      alert('Usa el botón de PayPal para proceder con el pago');
      return;
    }

    // Simular procesamiento de pago para otros métodos
    alert('Procesando pago...');
    setTimeout(() => {
      alert('¡Pago procesado exitosamente!');
      this.clearCartAfterPayment();
      this.router.navigate(['/products']);
    }, 2000);
  }

  clearCartAfterPayment() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotal');
    localStorage.removeItem('selectedCurrency');
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
