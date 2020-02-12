import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    'class': 'my-hero'
  }
})
export class AppComponent {
  title = 'MyHero';
}
