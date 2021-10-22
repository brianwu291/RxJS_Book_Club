import { useMachine } from '@xstate/react';
import { createMachine } from 'xstate';

export const APPLY_EVENTS = {
  onReset: 'onReset',
  onThirdPartyCookieBlocked: 'onThirdPartyCookieBlocked',
  onGoogleLogin: 'onGoogleLogin',
  onGoogleLoginSuccess: 'onGoogleLoginSuccess',
  onGoogleLoginError: 'onGoogleLoginError',
  onGmbApplyStart: 'onGmbApplyStart',
  onExistingLocationExist: 'onExistingLocationExist',
  onExistingLocationNotExist: 'onExistingLocationNotExist',
  onCreateNewLocation: 'onCreateNewLocation',
  onBindExistingLocation: 'onBindExistingLocation',
  onCreateNewLocationSuccess: 'onCreateNewLocationSuccess',
  onCreateNewLocationFail: 'onCreateNewLocationFail',
};

const googleLoginStates = {
  type: 'compound',
  initial: 'loading',
  states: {
    loading: {
      on: {
        [APPLY_EVENTS.onGoogleLoginSuccess]: 'success',
        [APPLY_EVENTS.onGoogleLoginError]: 'failure',
      },
    },
    success: {
      on: {
        [APPLY_EVENTS.onGmbApplyStart]: '#gmb.applyGmb',
      },
    },
    failure: {
      on: {
        [APPLY_EVENTS.onReset]: '#gmb.ready',
        [APPLY_EVENTS.onThirdPartyCookieBlocked]: '#gmb.blockThirdPartyCookie',
      }
    },
  },
};

const applyGmbState = {
  type: 'compound',
  initial: 'loading',
  states: {
    loading: {
      on: {
        [APPLY_EVENTS.onExistingLocationExist]: 'selectExistingLocations',
        [APPLY_EVENTS.onExistingLocationNotExist]: 'createNewLocation',
      },
    },
    selectExistingLocations: {
      on: {
        [APPLY_EVENTS.onCreateNewLocation]: 'createNewLocation',
        [APPLY_EVENTS.onBindExistingLocation]: '#gmb.applyGmbSuccess',
        [APPLY_EVENTS.onReset]: '#gmb.ready',
      },
    },
    createNewLocation: {
      on: {
        [APPLY_EVENTS.onCreateNewLocationSuccess]: '#gmb.applyGmbSuccess',
        [APPLY_EVENTS.onCreateNewLocationFail]: '#gmb.ready',
        [APPLY_EVENTS.onReset]: '#gmb.ready',
      },
    },
  },
};

const applyStepStates = {
  ready: {
    on: {
      [APPLY_EVENTS.onGoogleLogin]: 'googleLogin',
    },
  },
  blockThirdPartyCookie: {
    on: {
      [APPLY_EVENTS.onReset]: 'ready',
    },
  },
  googleLogin: googleLoginStates,
  applyGmb: applyGmbState,
  applyGmbSuccess: {
    type: 'final'
  },
};

export default function useGmbApplyFlowMachine(options) {
  const gmbApplyFlowMachine = createMachine({
    id: 'gmb',
    initial: 'ready',
    states: applyStepStates,
  });
  return useMachine(
    gmbApplyFlowMachine,
    options,
  );
}
