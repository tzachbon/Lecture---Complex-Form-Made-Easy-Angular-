# My Hero Demo Project

## Showcase the form abilities of angular

## But wait! We want to add more interesting and complex things!

Let's add date of birth field for the user.
But wait, what can we do if we want dynamic inputs?

Like if our hero fought a lot of villains and we want to know all their names.
We don't know how many villain so we can use Form Array for dynamic inputs!

## Let's make some imports first

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormContainerComponent } from "./container/form-container/form-container.component";
import {
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule
} from "@angular/material";
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

```typescript
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-form-container",
  templateUrl: "./form-container.component.html",
  styleUrls: ["./form-container.component.scss"]
})
export class FormContainerComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      dateOfBirth: new FormControl("", []), // This is the date control
      villainFought: new FormArray([
        // Here we initial form array with one control already in it
        new FormControl("", [Validators.required])
      ])
    });
  }

  // here's the method to add a control dynamically
  addVillainFoughtControl() {
    const formArray: FormArray = this.form.controls.villainFought as FormArray;
    formArray.push(new FormControl("", [Validators.required]));
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

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <mat-form-field appearance="outline">
    <input matInput placeholder="Hero name" formControlName="username" />
  </mat-form-field>

  <!-- This is the date template -->
  <mat-form-field appearance="outline">
    <input
      matInput
      [matDatepicker]="picker"
      formControlName="dateOfBirth"
      placeholder="Choose a date"
    />
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

    <div
      class="control"
      formArrayName="villainFought"
      *ngFor="let control of villainFoughtArray; let i = index"
    >
      <mat-form-field appearance="outline">
        <input
          matInput
          placeholder="Enter Villain Name"
          [formControlName]="i"
        />
        <mat-icon (click)="removeVillainFoughtControl(i)" matSuffix
          >remove</mat-icon
        >
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
