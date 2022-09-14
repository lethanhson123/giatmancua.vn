import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhVienInfoComponent } from './thanh-vien-info.component';

describe('ThanhVienInfoComponent', () => {
  let component: ThanhVienInfoComponent;
  let fixture: ComponentFixture<ThanhVienInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanhVienInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhVienInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
