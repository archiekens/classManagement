import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancesPage } from './attendances.page';

describe('AttendancesPage', () => {
  let component: AttendancesPage;
  let fixture: ComponentFixture<AttendancesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
