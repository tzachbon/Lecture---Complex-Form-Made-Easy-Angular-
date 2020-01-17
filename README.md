##  Creating the project


```shell
ng new MyHero
```

## Now let go to the App Module file and add the needed imports
```typescript
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

## Adding Angular Material
We'll add the library to provide us with ui elements so we don't have to write everything from scratch
```shell
ng add @angular/material
```
