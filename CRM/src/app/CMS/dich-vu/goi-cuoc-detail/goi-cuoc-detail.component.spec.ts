import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoiCuocDetailComponent } from './goi-cuoc-detail.component';

describe('GoiCuocDetailComponent', () => {
  let component: GoiCuocDetailComponent;
  let fixture: ComponentFixture<GoiCuocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoiCuocDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoiCuocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
