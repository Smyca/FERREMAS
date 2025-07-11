import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodDespachosComponent } from './bod-despachos.component';

describe('BodDespachosComponent', () => {
  let component: BodDespachosComponent;
  let fixture: ComponentFixture<BodDespachosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodDespachosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodDespachosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
