import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodPedidosComponent } from './bod-pedidos.component';

describe('BodPedidosComponent', () => {
  let component: BodPedidosComponent;
  let fixture: ComponentFixture<BodPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
