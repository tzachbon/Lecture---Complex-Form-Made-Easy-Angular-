# My Hero Demo Project

## Showcase the form abilities of angular

# What? you want do custom validation and async validation, Let's do it!

## Optional

Let's say we want our hero to be bigger that 18.
if his date of birth indicates that is younger than 18 the whole form isn't valid.

We should make a function for it:

```typescript
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

```typescript
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

## This is that easy.

# Now let's go to more complex stuff

### Async validators

Async validators are exactly like custom validators but they return Promise or Observable with the same format.

I made a function for demo proposes that behave like api end point and returns an observable which is boolean.
If the username is included or not.

Now let's build the custom async validator.

```typescript
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

```typescript
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

```html
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

![WE DONE](https://media.giphy.com/media/U6pavBhRsbNbPzrwWg/giphy.gif)
