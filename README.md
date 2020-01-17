# Complex Form Made Easy With Angular
### Forms are the life of the website world. If it is simple or super complex forms each site contains almost at least one form. In this lecture, we will learn how Enugler helps us make complex forms with ease

#

### Let's start with a project and demonstrate how easy it is!

#


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

Let's add date of birth field for the user.
But wait, what can we do if we want dynamic inputs?

Like if our hero fought a lot of villains and we want to know all their names.
We don't know how many villain so we can use Form Array for dynamic inputs!

## Let's make some imports first

``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormContainerComponent } from './container/form-container/form-container.component';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatButtonModule } from '@angular/material';
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

  // This material modules

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Let's write the code.

``` typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
      lastName: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', []), // This is the date control
      villainFought: new FormArray([ // Here we initial form array with one control already in it
        new FormControl('', [Validators.required])
      ])
    });
  }

// here's the method to add a control dynamically
  addVillainFoughtControl() {
    const formArray: FormArray = this.form.controls.villainFought as FormArray;
    formArray.push(
      new FormControl('', [Validators.required])
    );
  }

// here's the method to remove a control dynamically
  removeVillainFoughtControl(index: number) {
    const formArray: FormArray = this.form.controls.villainFought as FormArray;
    formArray.removeAt(index);
  }

// here's a computed value if we don't want to get an error in the initialization
  get villainFoughtArray() {
    return this.form ? (
      (this.form.controls.villainFought as FormArray).controls
    ) : [];
  }

  onSubmit() {
    console.log(this.form.value);

  }

}

```

## The template

``` html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <mat-form-field appearance="outline">
        <input matInput placeholder="First Name" formControlName="firstName" />
    </mat-form-field>
    <mat-form-field appearance="outline">
        <input matInput placeholder="Last Name" formControlName="lastName" />
    </mat-form-field>

    <!-- This is the date template -->
    <mat-form-field appearance="outline">
        <input matInput [matDatepicker]="picker" formControlName="dateOfBirth" placeholder="Choose a date" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    <!-- This is the villain fought template -->
    <section class="villain-fought-container">
        <div class="title-container">
            <h1>Please enter villains you fought</h1>
            <button type="button" mat-icon-button (click)="addVillainFoughtControl()">
                <mat-icon>add</mat-icon>
            </button>
        </div>

        <div class="control" formArrayName="villainFought" *ngFor="let control of villainFoughtArray; let i = index">
            <mat-form-field appearance="outline">
                <input matInput placeholder="Enter Villain Name" [formControlName]="i" />
                <mat-icon (click)="removeVillainFoughtControl(i)" matSuffix>remove</mat-icon>
            </mat-form-field>
        </div>
    </section>

    <button [disabled]="form.invalid && form.touched" type="submit">
        Submit
    </button>
</form>
```

# And that's it! We Are done!

My name is [Tzach Bonfil](https://tzachbonfilportfolio.web.app/) and I am a Senior Frontend Engineer in Intelligo.

If you have any question i would be more than happy to answer!
[tzachbonfil@gmail.com](mailto:tzachbonfil@gmail.com).

Or you can reach me on [Linkedin](https://www.linkedin.com/in/tzach-bonfil-21b822187/)

