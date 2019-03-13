import { createAction, handleActions } from 'redux-actions';

// 액션 타입을 정의해줍니다.
const SET_USERNAME = 'steem/setUsername';

// 액션 생성 함수를 만듭니다.
export const setUsername = createAction(SET_USERNAME);

const initialState = {
  username: '',
}

export default handleActions({
  [SET_USERNAME]: (state, action) => {
    // console.log(GET_ACCOUNT, action);
    let newState = {
      ...state,
      username: action.payload.username,
    }
    return newState;
  }
}, initialState);