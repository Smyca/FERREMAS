import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDespachosComponent } from './gestion-despachos.component';

describe('GestionDespachosComponent', () => {
  let component: GestionDespachosComponent;
  let fixture: ComponentFixture<GestionDespachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionDespachosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
