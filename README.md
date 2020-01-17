##  Creating the project

``` shell
ng new MyHero
```

## Now let's go to the App Module file and add the needed imports

``` typescript
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

``` shell
ng add @angular/material
```

## Create the form container component

``` shell
ng g c src/app/container/form-container
```

## We need to import the necessary modules

``` typescript

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormContainerComponent } from './container/form-container/form-container.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material'; // <== The imports

@NgModule({
  declarations: [
    AppComponent,
    FormContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,// <== 1
    MatInputModule // <== 2
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Creating the form template

``` html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <mat-form-field appearance="outline">
        <input matInput placeholder="First Name" formControlName="firstName" />
    </mat-form-field>
    <mat-form-field appearance="outline">
        <input matInput placeholder="Last Name" formControlName="lastName" />
    </mat-form-field>

    <button [disabled]="form.invalid && form.touched" type="submit">Submit</button>
</form>
```

## Now we will write a code that will make the template alive

``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.form);

  }

}

```

# And that's it! This is our first easy form!

![easy peasy](https://media2.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif?cid=790b76115ce33e5b32bf1218e530f1c0c69cbdb5a9b2f23e&rid=giphy.gif)

## But wait! We want to add more interesting and complex things!


