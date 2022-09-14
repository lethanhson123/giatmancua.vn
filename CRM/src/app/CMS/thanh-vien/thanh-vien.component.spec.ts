import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhVienComponent } from './thanh-vien.component';

describe('ThanhVienComponent', () => {
  let component: ThanhVienComponent;
  let fixture: ComponentFixture<ThanhVienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanhVienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
