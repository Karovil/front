import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet/>',
})
export class AppComponent {
  title = 'hospital-fronted';
}
