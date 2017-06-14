/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HerostatComponent } from './herostat.component';

describe('HerostatComponent', () => {
  let component: HerostatComponent;
  let fixture: ComponentFixture<HerostatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerostatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HerostatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
