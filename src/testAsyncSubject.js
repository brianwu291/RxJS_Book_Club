import { AsyncSubject } from 'rxjs';

function createAsyncSubject() {
  return new AsyncSubject();
}

export default function testAsyncSubject() {
  const source$ = createAsyncSubject();

  source$.subscribe((data) => {
    console.log(`AsyncSubject 第一次訂閱: ${data}`);
  });
  source$.next(1);
  source$.next(2);

  source$.subscribe((data) => {
    console.log(`AsyncSubject 第二次訂閱: ${data}`);
  });
  source$.next(3);
  source$.next(4);

  source$.subscribe((data) => {
    console.log(`AsyncSubject 第三次訂閱: ${data}`);
  });

  source$.complete();
}
