/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatchDetailNavComponent } from './match-detail-nav.component';

describe('MatchDetailNavComponent', () => {
  let component: MatchDetailNavComponent;
  let fixture: ComponentFixture<MatchDetailNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchDetailNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
