import { Component, computed, inject } from '@angular/core';
import { LayoutService } from '../../services/layout.service';


@Component({
  selector: 'app-main-bodega',
  templateUrl: './main-bodega.component.html',
  styleUrl: './main-bodega.component.css'
})
export class MainBodegaComponent {

  private layoutService = inject(LayoutService);
  
  sizeClass = computed(()=>{
    const isLeftSidebarCollapsed = this.layoutService.isLeftSidebarCollapsed();
    if(isLeftSidebarCollapsed){
      return '';
    }
    return this.layoutService.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  })

}
