import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBodegaComponent } from './sidebar-bodega.component';

describe('SidebarBodegaComponent', () => {
  let component: SidebarBodegaComponent;
  let fixture: ComponentFixture<SidebarBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarBodegaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
