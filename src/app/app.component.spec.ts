// src/app/app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { multiplyBy } from './operators/multiply-by.operator';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the multiplyBy operator correctly', () => {
    // Resetting component's finalValues for test
    component.finalValues = [];
    const values = [1, 2, 'three', 4, null];
    const expectedFinalValues = [2, 4, 8];

    of(...values).pipe(multiplyBy(2)).subscribe(value => {
      if (typeof value === 'number') {
        component.finalValues.push(value);
      }
    });

    expect(component.finalValues).toEqual(expectedFinalValues);
  });

  it('should render initial and final values in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const initialValues = compiled.querySelectorAll('.list-container:nth-of-type(1) li');
    expect(initialValues.length).toBe(5); // Matches the number of initial items

    const finalValues = compiled.querySelectorAll('.list-container:nth-of-type(2) li');
    expect(finalValues.length).toBe(3); // Only numeric values multiplied by 2
    expect(finalValues[0].textContent).toContain('2');
    expect(finalValues[1].textContent).toContain('4');
    expect(finalValues[2].textContent).toContain('8');
  });
});
