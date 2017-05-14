/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OverviewChartKill2Component } from './overview-chart-kill2.component';

describe('OverviewChartKill2Component', () => {
  let component: OverviewChartKill2Component;
  let fixture: ComponentFixture<OverviewChartKill2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewChartKill2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChartKill2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
