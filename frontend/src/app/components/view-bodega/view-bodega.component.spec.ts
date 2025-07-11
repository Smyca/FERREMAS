import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBodegaComponent } from './view-bodega.component';

describe('ViewBodegaComponent', () => {
  let component: ViewBodegaComponent;
  let fixture: ComponentFixture<ViewBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBodegaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
