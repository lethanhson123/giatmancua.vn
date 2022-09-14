import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhThuMoiTheoThangComponent } from './doanh-thu-moi-theo-thang.component';

describe('DoanhThuMoiTheoThangComponent', () => {
  let component: DoanhThuMoiTheoThangComponent;
  let fixture: ComponentFixture<DoanhThuMoiTheoThangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoanhThuMoiTheoThangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhThuMoiTheoThangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
