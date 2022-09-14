import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkListDetailComponent } from './work-list-detail.component';

describe('WorkListDetailComponent', () => {
  let component: WorkListDetailComponent;
  let fixture: ComponentFixture<WorkListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
