import { Subject } from 'rxjs';

function createSubject() {
  return new Subject();
}

export default function testSubject() {
  const source$ = createSubject();

  source$.subscribe((data) => {
    console.log(`Subject 第一次訂閱: ${data}`);
  });
  source$.next(1);
  source$.next(2);

  source$.subscribe((data) => {
    console.log(`Subject 第二次訂閱: ${data}`);
  });
  source$.next(3);
  source$.next(4);

  source$.subscribe((data) => {
    console.log(`Subject 第三次訂閱: ${data}`);
  });
  source$.next(5);
  source$.complete();
}
