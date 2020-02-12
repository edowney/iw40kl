import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaintRubricPage } from './paintRubric.page';

describe('PaintRubricPage', () => {
  let component: PaintRubricPage;
  let fixture: ComponentFixture<PaintRubricPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaintRubricPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaintRubricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
