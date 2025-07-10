import { Component, computed, inject } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-main-vendor',
  templateUrl: './main-vendor.component.html',
  styleUrl: './main-vendor.component.css'
})
export class MainVendorComponent {
  private layoutService = inject(LayoutService);
  
  sizeClass = computed(()=>{
    const isLeftSidebarCollapsed = this.layoutService.isLeftSidebarCollapsed();
    if(isLeftSidebarCollapsed){
      return '';
    }
    return this.layoutService.screenWidth() > 768 ? 'body-trimmed' : 'body-md-screen';
  })
}
