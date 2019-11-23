/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudGroupTabComponent } from './stud-group-tab.component';

describe('StudGroupTabComponent', () => {
  let component: StudGroupTabComponent;
  let fixture: ComponentFixture<StudGroupTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudGroupTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudGroupTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
