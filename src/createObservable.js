import { Observable } from 'rxjs';

export default function createObservable(callback) {
  return new Observable(callback);
}
