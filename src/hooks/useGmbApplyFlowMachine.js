import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

const googleLoginStates = {
  initial: 'fetchingOTC',
  context: {
    oneTimeCode: null,
    errorMessage: null,
    email: null,
  },
  states: {
    logging: 'logging',
    loginSuccess: 'loginSuccess',
    userDenyAccess: 'userDenyAccess',
  },
};

const applyStates = {
  unApply: 'unApply',
  term: 'term',
  googleLogin: googleLoginStates,

};

const gmbApplyFlowMachine = Machine({
  initial: 'start',
  states: applyStates,
});

export default function useGmbApplyFlowMachine(options) {
  return useMachine(gmbApplyFlowMachine, options);
}
