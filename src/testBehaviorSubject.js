import { BehaviorSubject } from 'rxjs';

function createBehaviorSubject(data) {
  return new BehaviorSubject(data);
}

export default function testBehaviorSubject() {
  const defaultData = 0;
  const source$ = createBehaviorSubject(defaultData);

  source$.subscribe((data) => {
    console.log(`BehaviorSubject 第一次訂閱: ${data}`);
  });
  source$.next(1);
  source$.next(2);

  source$.subscribe((data) => {
    console.log(`BehaviorSubject 第二次訂閱: ${data}`);
  });
  source$.next(3);
  console.log(`目前 BehaviorSubject 的內容是: ${source$.value}`);
  source$.complete();
}
