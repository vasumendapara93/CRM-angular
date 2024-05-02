import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModelFooterComponent } from './profile-model-footer.component';

describe('ProfileModelFooterComponent', () => {
  let component: ProfileModelFooterComponent;
  let fixture: ComponentFixture<ProfileModelFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileModelFooterComponent]
    });
    fixture = TestBed.createComponent(ProfileModelFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
