import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientProductsComponent } from './view-client-products.component';

describe('ViewClientProductsComponent', () => {
  let component: ViewClientProductsComponent;
  let fixture: ComponentFixture<ViewClientProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewClientProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClientProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
