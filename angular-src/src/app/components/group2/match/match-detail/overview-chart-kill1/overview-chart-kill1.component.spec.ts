/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OverviewChartKill1Component } from './overview-chart-kill1.component';

describe('OverviewChartKill1Component', () => {
  let component: OverviewChartKill1Component;
  let fixture: ComponentFixture<OverviewChartKill1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewChartKill1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewChartKill1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
