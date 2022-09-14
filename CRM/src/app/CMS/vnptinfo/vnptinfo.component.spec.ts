import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VNPTInfoComponent } from './vnptinfo.component';

describe('VNPTInfoComponent', () => {
  let component: VNPTInfoComponent;
  let fixture: ComponentFixture<VNPTInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VNPTInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VNPTInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
