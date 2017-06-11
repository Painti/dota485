/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FarmTableComponent } from './farm-table.component';

describe('FarmTableComponent', () => {
  let component: FarmTableComponent;
  let fixture: ComponentFixture<FarmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
