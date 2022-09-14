import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhNghiepCAMoiComponent } from './doanh-nghiep-camoi.component';

describe('DoanhNghiepCAMoiComponent', () => {
  let component: DoanhNghiepCAMoiComponent;
  let fixture: ComponentFixture<DoanhNghiepCAMoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoanhNghiepCAMoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhNghiepCAMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
