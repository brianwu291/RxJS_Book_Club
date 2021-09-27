import { BehaviorSubject } from 'rxjs';

export default function createBehaviorSubject(data) {
  return new BehaviorSubject(data);
}
