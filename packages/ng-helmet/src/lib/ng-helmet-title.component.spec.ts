import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgHelmetTitleComponent } from './ng-helmet-title.component';

describe('NgHelmetTitleComponent', () => {
  let component: NgHelmetTitleComponent;
  let fixture: ComponentFixture<NgHelmetTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgHelmetTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgHelmetTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
