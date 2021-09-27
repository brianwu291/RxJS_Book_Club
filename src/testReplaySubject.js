import { ReplaySubject } from 'rxjs';

function createReplaySubject(recentEventCount, windowTime) {
  return new ReplaySubject(recentEventCount, windowTime);
}

export default function testReplaySubject() {
  // const recentEventCount = 3;
  // const source$ = createReplaySubject(recentEventCount);

  // source$.subscribe((data) => {
  //   console.log(`ReplaySubject 第一次訂閱: ${data}`);
  // });
  // source$.next(1);
  // source$.next(2);
  // source$.next(3);

  // source$.subscribe((data) => {
  //   console.log(`ReplaySubject 第二次訂閱: ${data}`);
  // });
  // source$.next(4);
  // source$.complete();

  // test windowTime

  // const recentEventCount = 2, windowTime = 3000;
  // const source$ = createReplaySubject(recentEventCount, windowTime);

  // source$.subscribe((data) => {
  //   console.log(`ReplaySubject 第一次訂閱: ${data}`);
  // });
  // source$.next(1);
  // source$.next(2);

  // setTimeout(() => {
  //   source$.next(3);
  // }, 7000);

  // setTimeout(() => {
  //   source$.subscribe((data) => {
  //     console.log(`ReplaySubject 第二次訂閱: ${data}`);
  //   });
  // }, 8000);

}
