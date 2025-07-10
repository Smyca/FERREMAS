import { Component, HostListener, OnInit, signal } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrl: './view-vendor.component.css'
})
export class ViewVendorComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWith= signal<number>(window.innerWidth);

  constructor(private layoutService: LayoutService) {}

  @HostListener('window:resize')
  OnResize() {
    this.screenWith.set(window.innerWidth);
    this.layoutService.setScreenWidth(window.innerWidth);
    if(this.screenWith() < 768) {
      this.isLeftSidebarCollapsed.set(true);
      this.layoutService.setIsLeftSidebarCollapsed(true);
    }
  }

  ngOnInit(): void {
    const collapsed = this.screenWith() < 768;
    this.isLeftSidebarCollapsed.set(collapsed);
    this.layoutService.setIsLeftSidebarCollapsed(collapsed);
    this.layoutService.setScreenWidth(this.screenWith());
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean):void{
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
    this.layoutService.setIsLeftSidebarCollapsed(isLeftSidebarCollapsed);
  }

}
