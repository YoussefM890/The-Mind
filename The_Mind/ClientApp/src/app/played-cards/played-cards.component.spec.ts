import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayedCardsComponent } from './played-cards.component';

describe('PlayedCardsComponent', () => {
  let component: PlayedCardsComponent;
  let fixture: ComponentFixture<PlayedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayedCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
