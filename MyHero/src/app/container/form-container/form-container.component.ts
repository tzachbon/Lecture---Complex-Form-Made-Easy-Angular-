import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';

function biggerThan18(control: AbstractControl): null | ValidationErrors {

  const birthDate = control.value;

  if (!(birthDate instanceof Date)) {
    return { invalidDateFormat: false };
  }

  const today = new Date();
  const m = today.getMonth() - birthDate.getMonth();
  let age = today.getFullYear() - birthDate.getFullYear();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }


  return age >= 18 ? null : {
    notBigEnough: false
  };
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
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
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


  get villainFoughtArray() {
    return this.form ? (
      (this.form.controls.villainFought as FormArray).controls
    ) : [];
  }

  onSubmit() {
    console.log(this.form.value);

  }

}
