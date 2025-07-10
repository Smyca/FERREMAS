import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarVendorComponent } from './sidebar-vendor.component';

describe('SidebarVendorComponent', () => {
  let component: SidebarVendorComponent;
  let fixture: ComponentFixture<SidebarVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarVendorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
