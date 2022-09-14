import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DichVuInfoComponent } from './dich-vu-info.component';

describe('DichVuInfoComponent', () => {
  let component: DichVuInfoComponent;
  let fixture: ComponentFixture<DichVuInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DichVuInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DichVuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
