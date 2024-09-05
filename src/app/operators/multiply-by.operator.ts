import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function multiplyBy(factor: number): OperatorFunction<any, number> {
  return (source$: Observable<any>) =>
    source$.pipe(
      map((value) => (typeof value === 'number' ? value * factor : value))
    );
}