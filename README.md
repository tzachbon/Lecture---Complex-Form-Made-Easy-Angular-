##  Creating the project


```bash
ng new MyHero
```

## Now let go to the App Module file and add the needed imports
```angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // <== The module we need
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```