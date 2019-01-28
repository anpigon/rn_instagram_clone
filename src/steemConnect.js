import sc2 from 'steemconnect';
import Config from './config';

const api = sc2.Initialize({
  app: Config.SC2_APP_ID,
	callbackURL: Config.SC2_CALLBACK_URL,
	// accessToken: tokens.access_token,
	scope: ['vote','comment','delete_comment','comment_options','custom_json','claim_reward_balance','offline']
});

export default api;