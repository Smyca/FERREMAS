import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-vendor',
  templateUrl: './sidebar-vendor.component.html',
  styleUrls: ['./sidebar-vendor.component.css']
})
export class SidebarVendorComponent {
  isLeftSidebarCollapsed = input<boolean>(false);
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
 
    {
      routeLink: '/view-vendor/main-vendor/productos',
      icon: 'fal fa-box',
      label: 'Productos'
    },
    {
      routeLink: '/view-vendor/main-vendor/gestion-pedidos',
      icon: 'fal fa-shopping-cart',
      label: 'Gestión de Pedidos'
    },
    {
      routeLink: '/view-vendor/main-vendor/gestion-despachos',
      icon: 'fal fa-truck',
      label: 'Gestión de Despachos'
    }
  ];


  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleCollapse() {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav() {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
