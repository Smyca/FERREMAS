import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar-vendor',
  templateUrl: './sidebar-vendor.component.html',
  styleUrl: './sidebar-vendor.component.css'
})
export class SidebarVendorComponent {
  isLeftSidebarCollapsed = input<boolean>(false);
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: '/view-vendor/main-vendor/dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
    },
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


  toggleCollapse():void{
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav():void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

}
