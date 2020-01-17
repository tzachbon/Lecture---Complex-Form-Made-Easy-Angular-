import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators';
import { checkUserName } from './form-container.util';



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


  return age >= 18 ? null : {
    notBigEnough: true
  };
}


function heroNameValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

  return checkUserName(control.value)
    .pipe(
      debounceTime(500),
      take(1),
      map(isIncluded => (
        isIncluded ? {
          isIncluded: true
        } : null
      ))
    );
}




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
      username: new FormControl('', [Validators.required], [heroNameValidator]),
      dateOfBirth: new FormControl('', [biggerThan18]),
      villainFought: new FormArray([
        new FormControl('', [Validators.required])
      ])
    });
  }

  addVillainFoughtControl() {
    const formArray: FormArray = this.form.controls.villainFought as FormArray;
    formArray.push(
      new FormControl('', [Validators.required])
    );
  }

  removeVillainFoughtControl(index: number) {
    const formArray: FormArray = this.form.controls.villainFought as FormArray;
    formArray.removeAt(index);
  }


  get usernameControl() {
    return this.form.get('username');
  }


  get villainFoughtArray() {
    return this.form ? (
      (this.form.controls.villainFought as FormArray).controls
    ) : [];
  }

  onSubmit() {
    // console.log(this.form.value);
    console.log(this.usernameControl.errors);


  }

}
