import { createAction, handleActions } from 'redux-actions';
import Dataset from 'impagination';

// 액션 타입을 정의해줍니다.
const GET_FEEDS = 'steem/getFeeds';

// 액션 생성 함수를 만듭니다.
export const getFeeds = createAction(GET_FEEDS);
// export function getFeeds(payload) {
//   return { type: GET_FEEDS, payload }
// }

const DEFAULT_LIMIT = 3;

const initialState = {
  feeds: [],
  nextFeeds: {
    isNext: false,
    startAuthor: '',
    startPermlink: '',
  }
}

export const fetchFeeds = (tag, limit=DEFAULT_LIMIT, order='created') => {
  return (dispatch, state) => {
    // const { nextFeeds } = state().steem;
    const data = {
      id: 1,
      jsonrpc: "2.0",
      method: "call",
      params: [
        "database_api",
        `get_discussions_by_${order}`,
        [
          {
            tag: tag || "kr",
            limit: limit + 1,
            // start_author: nextFeeds.startAuthor,
            // start_permlink: nextFeeds.startPermlink
          }
        ]
      ]
    };
    return fetch('https://api.steemit.com',
    {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      let nextFeeds = {
        isNext: false, // 다음 글이 있는지 여부
        startAuthor: '',
        startPermlink: ''
      }
      if(res.result.length > DEFAULT_LIMIT) {
        const { author, permlink } = res.result.pop();
        nextFeeds = {
          isNext: true, // 다음 글이 있는지 여부
          startAuthor: author,
          startPermlink: permlink
        }
      }
      dispatch(getFeeds({
        feeds: res.result,
        nextFeeds
      }))
    })
    .catch(error => {
      console.error('ERROR', error); // TODO: 에러처리는 어떻게 할 것인가? 학습필요!!!
    });
  };

  // return (dispatch, state) => {
  //   let dataset = new Dataset({
  //     pageSize: 10,
  //     observe: (datasetState) => {
  //       //this.setState({datasetState});
  //       // console.log('datasetState', datasetState);
  //       // dispatch(getFeeds(datasetState));
  //     },
  //     // 데이터를 가져오기
  //     fetch(pageOffset, pageSize, stats) {
  //       return fetch('https://api.steemit.com',
  //       {
  //           method: 'POST',
  //           body: JSON.stringify(data)
  //       })
  //         .then(response => response.json())
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   });
  //   dataset.setReadOffset(0);
  //   console.log('dataset', dataset);
  // }
}

export default handleActions({
  [GET_FEEDS]: (state, action) => {
    // console.log(GET_FEEDS, { state, action });
    // console.log('nextFeeds', action.payload.nextFeeds);

    // state 업데이트
    state = {
      ...state,
      feeds: [
        ...state.feeds,
        ...action.payload.feeds
      ],
      ...action.payload.nextFeeds
    }
    return state;
  },
}, initialState);