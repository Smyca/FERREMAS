import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBodegaComponent } from './main-bodega.component';

describe('MainBodegaComponent', () => {
  let component: MainBodegaComponent;
  let fixture: ComponentFixture<MainBodegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainBodegaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBodegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
