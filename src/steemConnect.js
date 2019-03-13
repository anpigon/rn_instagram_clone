import sc2 from 'steemconnect';
import { SC2_APP_ID, SC2_CALLBACK_URL } from './config';

const api = sc2.Initialize({
  app: SC2_APP_ID,
	callbackURL: SC2_CALLBACK_URL,
	// accessToken: tokens.access_token,
	scope: ['vote','comment','delete_comment','comment_options','custom_json','claim_reward_balance','offline']
});

export default api;