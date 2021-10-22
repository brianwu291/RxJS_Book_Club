import { useState } from 'react';

import { useMachine } from '@xstate/react';
import { createMachine, assign } from 'xstate';

export const APPLY_EVENTS = {
  toReady: 'toReady',
  toAgreeTerm: 'toAgreeTerm',
  toWarnThirdPartyCookieBlocked: 'blockThirdPartyCookie',
  toGoogleLogin: 'toGoogleLogin',
  toGmbApply: 'toGmbApply',
  hasExistingLocation: 'toSelectExistingLocations',
  noExistingLocation:  'toCreateNewLocation',
  toCreateNewLocation: 'toCreateNewLocation',
  bindExistingLocation: 'toApplySuccess',
  applyNewLocationSuccess: 'toApplySuccess',
  applyNewLocationFail: 'toApplyFail',
};

const getOTC = () => new Promise((res) => {
  setTimeout(() => {
    res({
      oneTimeCode: null,
      error: 'user deny',
    });
    // const random = Math.random() * 5;
    // if (random >= 2) {
    //   res({
    //     oneTimeCode: 'one time code',
    //     error: null,
    //   });
    // } else {
    //   res({
    //     oneTimeCode: null,
    //     error: 'user deny',
    //   });
    // }
  }, 1000);
});

const googleLoginStates = {
  type: 'compound',
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        id: 'login',
        src: async ({ loginMutate }) => {
          const {
            oneTimeCode,
            error,
          } = await getOTC();
          if (oneTimeCode) {
            const email = await loginMutate(oneTimeCode);
            return ({
              email,
              oneTimeCode,
            });
          }
          throw ({
            error,
            email: null,
            oneTimeCode: null,
          });
        },
        onDone: {
          target: 'success',
          actions: ['onLoginSuccess'],
        },
        onError: {
          target: 'failure',
          actions: ['onLoginFail'],
        },
      },
    },
    success: {
      on: {
        [APPLY_EVENTS.toGmbApply]: {
          target: '#gmb.applyGmb',
        },
      },
    },
    failure: {
      on: {
        [APPLY_EVENTS.toReady]: {
          target: '#gmb.ready',
        },
        [APPLY_EVENTS.toAgreeTerm]: {
          target: '#gmb.agreeTerm',
        },
        [APPLY_EVENTS.toWarnThirdPartyCookieBlocked]: {
          target: '#gmb.blockThirdPartyCookie'
        },
      }
    },
  },
};

const applyGmbState = {
  type: 'compound',
  initial: 'fetchingExistingLocations',
  states: {
    fetchingExistingLocations: {
      on: {
        [APPLY_EVENTS.hasExistingLocation]: {
          target: 'selectExistingLocations',
          actions: ['onReceiveExistingLocations'],
        },
        [APPLY_EVENTS.noExistingLocation]: {
          target: 'createNewLocation',
          actions: ['onReceiveExistingLocations'],
        },
      },
    },
    selectExistingLocations: {
      on: {
        [APPLY_EVENTS.toCreateNewLocation]: {
          target: 'createNewLocation'
        },
        [APPLY_EVENTS.bindExistingLocation]: {
          target: 'applySuccess',
        }
      },
    },
    createNewLocation: {
      on: {
        [APPLY_EVENTS.applyNewLocationSuccess]: {
          target: 'applySuccess',
        },
        [APPLY_EVENTS.applyNewLocationFail]: {
          target: 'applyFail',
        },
      },
    },
    applySuccess: {
      type: 'final'
    },
    applyFail: {
      type: 'final'
    },
  },
};

const applyStepStates = {
  ready: {
    on: {
      [APPLY_EVENTS.toAgreeTerm]: 'agreeTerm',
    },
  },
  agreeTerm: {
    on: {
      [APPLY_EVENTS.toGoogleLogin]: 'googleLogin',
    },
  },
  blockThirdPartyCookie: {
    on: {
      [APPLY_EVENTS.toReady]: 'ready',
    },
  },
  googleLogin: googleLoginStates,
  applyGmb: applyGmbState,
};

function useGoogleUserLoginMutation() {
  const [result, setResult] = useState('');
  const mutate = () => new Promise((res) => {
    setTimeout(() => {
      res('sdzse@g,ail.com');
      setResult('sdzse@g,ail.com');
    }, 700);
  });
  return [mutate, result];
}

export default function useGmbApplyFlowMachine(options) {
  const [loginMutate] = useGoogleUserLoginMutation();
  const gmbApplyFlowMachine = createMachine({
    id: 'gmb',
    initial: 'ready',
    context: {
      oneTimeCode: null,
      errorMessage: null,
      email: null,
      existingLocations: null,
      loginMutate
    },
    states: applyStepStates,
  });
  return useMachine(
    gmbApplyFlowMachine,
    {
      actions: {
        onLoginSuccess: assign({
          oneTimeCode: (_, { data }) => data.oneTimeCode,
          email: (_, { data }) => data.email,
        }),
        onLoginFail: assign({
          errorMessage: (_, { data }) => data.error,
        }),
        onReceiveExistingLocations: assign({
          existingLocations: (_, event) => {
            if (event.type === APPLY_EVENTS.hasExistingLocation) {
              return [
                {
                  name: 'location-one',
                  id: 'location-one-id',
                },
              ]
            }
            return [];
          }
        }),
      },
      ...options,
    },
  );
}
