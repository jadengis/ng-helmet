import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHelmetMetaComponent } from './ng-helmet-meta.component';

describe('NgHelmetMetaComponent', () => {
  let component: NgHelmetMetaComponent;
  let fixture: ComponentFixture<NgHelmetMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgHelmetMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgHelmetMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
