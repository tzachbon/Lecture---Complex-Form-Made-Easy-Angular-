import { Observable } from 'rxjs';


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
  })
}
