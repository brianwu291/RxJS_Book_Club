import React from 'react';
import ReactDOM from 'react-dom';

// import testObservable from './testObservable';
// import testSubject from './testSubject';
// import createBehaviorSubject from './createBehaviorSubject';

function App() {
  // #Observable
  // testObservable();


  // #Subject
  // testSubject();

  // const source$ = createSubject();

  // source$.subscribe((data) => {
  //   console.log(`Subject 第一次訂閱: ${data}`);
  // });
  // source$.next(1);
  // source$.next(2);

  // source$.subscribe((data) => {
  //   console.log(`Subject 第二次訂閱: ${data}`);
  // });
  // source$.next(3);
  // source$.next(4);

  // source$.subscribe((data) => {
  //   console.log(`Subject 第三次訂閱: ${data}`);
  // });
  // source$.next(5);
  // source$.complete();


  // #BehaviorSubject

  // const defaultData = 0;
  // const source$ = createBehaviorSubject(defaultData);

  // source$.subscribe((data) => {
  //   console.log(`BehaviorSubject 第一次訂閱: ${data}`);
  // });
  // source$.next(1);
  // source$.next(2);

  // source$.subscribe((data) => {
  //   console.log(`BehaviorSubject 第二次訂閱: ${data}`);
  // });
  // source$.next(3);
  // console.log(`目前 BehaviorSubject 的內容是: ${source$.value}`);
  // source$.complete();

  return (
    <div>
      App
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
