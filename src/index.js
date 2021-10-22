import React from 'react';
import ReactDOM from 'react-dom';

import useGmbApplyFlowMachine, {
  APPLY_EVENTS,
} from './hooks/useGmbApplyFlowMachine';

// import testObservable from './testObservable';
// import testSubject from './testSubject';
// import testBehaviorSubject from './testBehaviorSubject';
// import testReplaySubject from './testReplaySubject';
// import testAsyncSubject from './testAsyncSubject';
// import testAsObservable from './testAsObservable';
// import testWarmObservable from './testWarmObservable';
// import memberOne from './memberOne';

function App() {
  const [state, send] = useGmbApplyFlowMachine();
  console.log('current state', state);
  console.log('current context', state.context);
  return (
    <div>
      App
      <div>
        {`current state: ${state.toStrings().toString()}`}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {Object.keys(APPLY_EVENTS).map(eventType => (
          <button
            key={eventType}
            type="button"
            onClick={() => send(APPLY_EVENTS[eventType])}
            style={{
              marginBottom: '10px',
            }}
          >
            {eventType}
          </button>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
