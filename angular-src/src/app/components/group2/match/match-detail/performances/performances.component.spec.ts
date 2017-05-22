/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PerformancesComponent } from './performances.component';

describe('PerformancesComponent', () => {
  let component: PerformancesComponent;
  let fixture: ComponentFixture<PerformancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
