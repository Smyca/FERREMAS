import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sidebar-bodega',
  templateUrl: './sidebar-bodega.component.html',
  styleUrl: './sidebar-bodega.component.css'
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

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
