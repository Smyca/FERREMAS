import { Component, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-bodega',
  templateUrl: './sidebar-bodega.component.html',
  styleUrls: ['./sidebar-bodega.component.css']
})
export class SidebarBodegaComponent {
  isLeftSidebarCollapsed = input<boolean>(false);
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: '/view-bodega/main-bodega/bod-pedidos',
      icon: 'fal fa-shopping-cart',
      label: 'Gestión de Pedidos'
    },
    {
      routeLink: '/view-bodega/main-bodega/bod-despachos',
      icon: 'fal fa-truck',
      label: 'Gestión de Despachos'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
