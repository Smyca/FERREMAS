import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVendorComponent } from './main-vendor.component';

describe('MainVendorComponent', () => {
  let component: MainVendorComponent;
  let fixture: ComponentFixture<MainVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainVendorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
