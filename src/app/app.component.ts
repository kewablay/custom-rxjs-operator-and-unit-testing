import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { multiplyBy } from './operators/multiply-by.operator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  values = [1, 2, 'three', 4, null]
  finalValues: number[] = []

  ngOnInit(){
    of(...this.values).pipe(
      multiplyBy(2)

    ).subscribe((value) => {
      if(typeof value === 'number'){
        this.finalValues.push(value)
      }
    })
  }
}
