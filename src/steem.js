import { Client } from 'dsteem';
import Remarkable from 'remarkable';
const md = new Remarkable({ html: true, linkify: false, breaks: false });
// import removeMarkdown from 'remove-markdown';

const DEFAULT_SERVER = 'https://api.steemit.com';
let client = new Client(DEFAULT_SERVER);

export const getFeeds = (query, user) => {
  return client.database.getDiscussions('feed', query)
    .then(posts => {
      console.log(query, posts.length);
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
  return client.database.call('get_following', [username, startFollowing, 'blog', limit])
      .then(followings => followings.map(({ following }) => following));
}
