import 'whatwg-fetch';
// import { Client } from './dsteem';
import axios from 'axios';
import Remarkable from 'remarkable';
const md = new Remarkable({ html: true, linkify: false, breaks: false });
// import removeMarkdown from 'remove-markdown';

const DEFAULT_SERVER = 'https://api.steemit.com';
// let client = new Client(DEFAULT_SERVER);
const client = axios.create({
  baseURL: DEFAULT_SERVER,
  method: 'post',
  headers: {'Content-Type': 'application/json; charset=utf-8'},
});

function call(api, method, params = []) {
  const request = {
    id: '0',
    jsonrpc: '2.0',
    method: 'call',
    params: [api, method, params],
  };
  const body = JSON.stringify(request, (key, value) => {
    if (typeof value === 'object' && value.type === 'Buffer') {
        return Buffer.from(value.data).toString('hex');
    }
    return value;
  });
  // console.log(body);
  return client.post('', body)
    .then(({
      status,
      statusText,
      data
    }) => {
      // console.log(data)
      if(status === 200) {
        if(data.error) new Error(`${error.code}:${error.message}`);
        if(data.result.error) new Error(`${data.result.error.code}:${data.result.error.message}`);
        return data.result;
      } else {
        throw new Error(`${status}:${statusText}`)
      }
    });
}

function getDiscussions(by, query) {
  return call('condenser_api', `get_discussions_by_${by}`, [query]);
}

export const getFeeds = (query, user) => {
  return getDiscussions('feed', query)
    .then(posts => {
      // console.log(query, posts.length);
      return posts.map(post => {
        let summary = md.render(post.body).replace(/<\/?[^>]+(>|$)/g, '').replace(/https?:\/\/[^\s]+/g, "").replace(/(^(\n|\r|\s)*)>([\s\S]*?).*\s*/g, "").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "").slice(0, 200);
        return {
          ...post,
          summary
        };
      })
    });
};

export const getFollowing = (username, startFollowing, limit = 100) => {
  return call('condenser_api', 'get_following', [username, startFollowing, 'blog', limit])
      .then(followings => followings.map(({ following }) => following));
}
