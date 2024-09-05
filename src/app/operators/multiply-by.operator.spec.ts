import { of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { multiplyBy } from './multiply-by.operator';

describe('multiplyBy operator', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should multiply numeric values by the given factor', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a-b-c-d-|', { a: 1, b: 2, c: 3, d: 4 });
      const expected = 'a-b-c-d-|';
      const result$ = source$.pipe(multiplyBy(2));

      expectObservable(result$).toBe(expected, { a: 2, b: 4, c: 6, d: 8 });
    });
  });

  it('should not modify non-numeric values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a-b-c-d-|', { a: 'hello', b: true, c: null, d: undefined });
      const expected = 'a-b-c-d-|';
      const result$ = source$.pipe(multiplyBy(2));

      expectObservable(result$).toBe(expected, { a: 'hello', b: true, c: null, d: undefined });
    });
  });

  it('should handle mixed numeric and non-numeric values', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a-b-c-d-|', { a: 1, b: 'two', c: 3, d: false });
      const expected = 'a-b-c-d-|';
      const result$ = source$.pipe(multiplyBy(3));

      expectObservable(result$).toBe(expected, { a: 3, b: 'two', c: 9, d: false });
    });
  });

  it('should work with negative factors', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a-b-c-|', { a: 1, b: -2, c: 3 });
      const expected = 'a-b-c-|';
      const result$ = source$.pipe(multiplyBy(-2));

      expectObservable(result$).toBe(expected, { a: -2, b: 4, c: -6 });
    });
  });

//   it('should handle zero as a factor', () => {
//     testScheduler.run(({ cold, expectObservable }) => {
//       const source$ = cold('a-b-c-|', { a: 1, b: -2, c: 3 });
//       const expected = 'a-b-c-|';
//       const result$ = source$.pipe(multiplyBy(0));

//       expectObservable(result$).toBe(expected, { a: 0, b: 0, c: 0 });
//     });
//   });

  it('should work with floating-point numbers', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('a-b-c-|', { a: 1.5, b: 2.25, c: 3.75 });
      const expected = 'a-b-c-|';
      const result$ = source$.pipe(multiplyBy(2));

      expectObservable(result$).toBe(expected, { a: 3, b: 4.5, c: 7.5 });
    });
  });

  it('should handle empty observables', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const source$ = cold('|');
      const expected = '|';
      const result$ = source$.pipe(multiplyBy(2));

      expectObservable(result$).toBe(expected);
    });
  });
});