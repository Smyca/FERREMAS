import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPayComponent } from './client-pay.component';

describe('ClientPayComponent', () => {
  let component: ClientPayComponent;
  let fixture: ComponentFixture<ClientPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
