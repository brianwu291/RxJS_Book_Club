import React from 'react';
import ReactDOM from 'react-dom';

// import testObservable from './testObservable';
// import testSubject from './testSubject';
// import testBehaviorSubject from './testBehaviorSubject';
// import testReplaySubject from './testReplaySubject';
// import testAsyncSubject from './testAsyncSubject';
// import testAsObservable from './testAsObservable';
// import testWarmObservable from './testWarmObservable';
import memberOne from './memberOne';

function App() {
  memberOne();
  // #Observable
  // testObservable();

  // #Subject
  // testSubject();

  // #BehaviorSubject
  // testBehaviorSubject();

  // #ReplaySubject
  // testReplaySubject();

  // #AsyncSubject
  // testAsyncSubject();

  // #AsObservable
  // testAsObservable();

  // #WarmObservable
  // testWarmObservable();

  return (
    <div>
      App
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
