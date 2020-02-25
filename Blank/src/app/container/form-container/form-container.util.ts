import { Observable } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';


const heroesNames = [
  'batman',
  'superman'
];


export function checkUserName(name: string) {
  return new Observable<boolean>((sub) => {
    setTimeout(() => {
      const isIncluded = name && typeof name === 'string' && heroesNames.includes(name);

      sub.next(isIncluded);
    }, 2000);
  });
}

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
