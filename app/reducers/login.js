import * as LoginTypes from '../constants/LoginTypes';

const initialState = [{
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  account: {} as any,
  errorMessage: null as string, // Errors returned from server side
  redirectMessage: null as string
}];

const actionsMap = {
  [LoginTypes.LOGIN_START](state, action) {
    return [{
      loading: true
    }, ...state];
  },
  [LoginTypes.LOGIN_SUCCESS](state, action) {
    return [{
      loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true
    }, ...state];
  },
  [LoginTypes.LOGIN_FAILURE](state, action) {
    return [{
      errorMessage: action.payload,
        showModalLogin: true,
        loginError: true
    }, ...state];
  },
  [LoginTypes.GET_SESSION_START](state, action) {
    return [{
      loading: true
    }, ...state];
  },
  [LoginTypes.GET_SESSION_SUCCESS](state, action) {
    const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
    return [{
      isAuthenticated,
        loading: false,
        account: action.payload.data
    }, ...state];
  },
  [LoginTypes.GET_SESSION_FAILURE](state, action) {
    return [{
      loading: false,
        isAuthenticated: false,
        showModalLogin: true,
        errorMessage: action.payload
    }, ...state];
  },
  [LoginTypes.CLEAR_AUTH](state/*, action*/) {
    return [initialState, ...state];
  },
  [ActionTypes.CLEAR_COMPLETED](state/*, action*/) {
    return state.filter(todo => todo.completed === false);
  }
};

export default function todos(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
