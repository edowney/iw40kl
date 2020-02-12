import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChessClockPage } from './chessClock.page';

describe('ChessClockPage', () => {
  let component: ChessClockPage;
  let fixture: ComponentFixture<ChessClockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChessClockPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChessClockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
