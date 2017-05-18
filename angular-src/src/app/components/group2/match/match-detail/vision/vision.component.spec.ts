/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VisionComponent } from './vision.component';

describe('VisionComponent', () => {
  let component: VisionComponent;
  let fixture: ComponentFixture<VisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
