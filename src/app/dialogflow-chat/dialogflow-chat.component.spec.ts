import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogflowChatComponent } from './dialogflow-chat.component';

describe('DialogflowChatComponent', () => {
  let component: DialogflowChatComponent;
  let fixture: ComponentFixture<DialogflowChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogflowChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogflowChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
