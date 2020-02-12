# Complex Form Made Easy With Angular

### Forms are the life of the website world. If it is simple or super complex forms each site contains almost at least one form. In this lecture, we will learn how Angular helps us make complex forms with ease

### [Finished demo](https://tzachbon.github.io/Lecture---Complex-Form-Made-Easy-Angular-/)

### [Lecture Slide](https://docs.google.com/presentation/d/e/2PACX-1vTcjD1wIzwroavH3LvjaGZNbox-cw1zumjd6JDn-tR9H0l7X6gOsx7PyzirSnoEnhkRdIZd6Gm-K3zY/pub?start=true&loop=false&delayms=3000)

#

### Let's start with a project and demonstrate how easy it is!

#

## Creating the project

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
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule // <== The module we need
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
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
  declarations: [AppComponent, FormContainerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule, // <== 1
    MatInputModule // <== 2
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Creating the form template

``` html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
    <mat-form-field appearance="outline">
        <input matInput placeholder="Hero name" formControlName="username" />
    </mat-form-field>
    <button [disabled]="form.invalid && form.touched" type="submit">
        Submit
    </button>
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
  constructor() {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required])
    });
  }
  onSubmit() {
    console.log(this.form);
  }
}
```

# And that's it! This is our first easy form!

![easy peasy](https://media2.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif?cid=790b76115ce33e5b32bf1218e530f1c0c69cbdb5a9b2f23e&rid=giphy.gif)

## But wait! We want to add more interesting and complex features!

Let's add a date of birth field for the user.

But wait, what can we do if we want dynamic inputs?

Like if our hero fought a lot of villains and we want to know all their names.

We don't know how many villains are there, so we can use Form Array for dynamic inputs!

## Let's make some imports first

``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormContainerComponent } from './container/form-container/form-container.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
@NgModule({
  declarations: [AppComponent, FormContainerComponent],
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
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
  constructor() {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', []), // This is the date control
      villainFought: new FormArray([
        // Here we initial form array with one control already in it
        new FormControl('', [Validators.required])
      ])
    });
  }
  // here's the method to add a control dynamically
  addVillainFoughtControl() {
    const formArray: FormArray = this.form.controls.villainFought as FormArray;
    formArray.push(new FormControl('', [Validators.required]));
  }
  // here's the method to remove a control dynamically
  removeVillainFoughtControl(index: number) {
    const formArray: FormArray = this.form.controls.villainFought as FormArray;
    formArray.removeAt(index);
  }
  // here's a computed value if we don't want to get an error in the initialization
  get villainFoughtArray() {
    return this.form
      ? (this.form.controls.villainFought as FormArray).controls
      : [];
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
        <input matInput placeholder="Hero name" formControlName="username" />
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

![I'm Done](https://media0.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif?cid=790b76115f8823e99a2be1cd3b062492cdc3243162a56ae0&rid=giphy.gif)

# What? you want to do custom validation and async validation? Let's do it!

## Optional

Let's say we want our hero to be older than 18.

if his date of birth indicates that he is younger than 18, the entire form isn't valid.

We should make a function for it:

``` typescript
function biggerThan18(control: AbstractControl): null | ValidationErrors {
  const birthDate = control.value;
  if (!(birthDate instanceof Date)) {
    return { invalidDateFormat: true };
  }
  const today = new Date();
  const m = today.getMonth() - birthDate.getMonth();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18
    ? null
    : {
        notBigEnough: true
      };
}
```

And add the function to the form group:

``` typescript
 initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [biggerThan18]), // <=== HERE
      villainFought: new FormArray([
        new FormControl('', [Validators.required])
      ])
    });
  }
```

## It's that easy.

# Now let's move on to more complex stuff

### Async validators

Async validators are exactly like custom validators but they return Promise or Observable with the same format.

I made a function for demo proposes that behave like api end point and returns an observable which is boolean. Basically it says if the username already exists or not.

Now let's build the custom async validator.

``` typescript
function heroNameValidator(
  control: AbstractControl
): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  return checkUserName(control.value).pipe(
    debounceTime(500), // wait for the user to stop typing for half a second
    take(1), // make sure that is one call per request
    map((
      isIncluded // maps to the format we need
    ) =>
      isIncluded
        ? {
            isIncluded: true
          }
        : null
    )
  );
}
```

``` typescript
  initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required], [heroNameValidator]), // <== the third argument is a async validators array
      dateOfBirth: new FormControl('', [biggerThan18]),
      villainFought: new FormArray([
        new FormControl('', [Validators.required])
      ])
    });
  }
```

## Now let's make our template smarter

``` html
<mat-form-field appearance="outline">
    <input matInput placeholder="Hero name" formControlName="username" />
    <!-- To show to the user the check status -->
    <mat-icon class="mat-18" matSuffix *ngIf="usernameControl.touched">
        <ng-container *ngIf="usernameControl.pending">
            cached
        </ng-container>
        <ng-container *ngIf="usernameControl.valid">
            done
        </ng-container>
        <ng-container *ngIf="usernameControl.invalid">
            error
        </ng-container>
    </mat-icon>
    <mat-error *ngIf="usernameControl.errors?.isIncluded">
        User name already taken
    </mat-error>
</mat-form-field>
```

# And again we are done for good!

![WE DONE](https://i.giphy.com/media/U6pavBhRsbNbPzrwWg/giphy.webp)

My name is [Tzach Bonfil](https://tzachbonfilportfolio.web.app/) and I am a Senior Frontend Engineer in [Intelligo](https://intelligo.ai/).

If you have any question i would be more than happy to answer!

[tzachbonfil@gmail.com](mailto:tzachbonfil@gmail.com).

Or you can reach me on [Linkedin](https://www.linkedin.com/in/tzach-bonfil-21b822187/)

Thank You!

