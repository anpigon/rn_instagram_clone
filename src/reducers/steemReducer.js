import { createAction, handleActions } from 'redux-actions';

// 액션 타입을 정의해줍니다.
const GET_FEEDS = 'steem/getFeeds';

// 액션 생성 함수를 만듭니다.
export const getFeeds = createAction(GET_FEEDS);
// export function getFeeds(payload) {
//   return { type: GET_FEEDS, payload }
// }

const initialState = {
  feeds: []
}

export const fetchFeeds = (tag, limit, order) => {
  const data = {
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
          "database_api",
          `get_discussions_by_${order || 'created'}`,
          [
              {
                  tag: tag || "kr",
                  limit: limit || 10,
                  // start_author:"",
                  // start_permlink:""
              }
          ]
      ]
  };
  return (dispatch, state) => {
    return fetch('https://api.steemit.com',
    {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      // console.log(res.result)
      // res.result
      dispatch(getFeeds(res.result))
    })
    .catch(error => {
      console.error('ERROR', error); // TODO: 에러처리는 어떻게 할 것인가? 학습필요!!!
    });
  };
}

export default handleActions({
  [GET_FEEDS]: (state, action) => {
    // console.log(GET_FEEDS, { state, action });
    state = {
      ...state,
      feeds: [
        ...state.feeds,
        ...action.payload
      ]
    }
    return state;
  },
}, initialState);