import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhNghiepMoiComponent } from './doanh-nghiep-moi.component';

describe('DoanhNghiepMoiComponent', () => {
  let component: DoanhNghiepMoiComponent;
  let fixture: ComponentFixture<DoanhNghiepMoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoanhNghiepMoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhNghiepMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
