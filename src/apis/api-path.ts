export const API_PATH = {
  login: '/auth/:provider/callback',
  updateToken: '/auth/refresh',
  roleSelect: '/auth/roleselect',
  channel: 'chat/channels/:id',
  channelMessages: 'chat/channels/:id/messages',
  createGroup: '/channel/group',
  feeds: '/feeds',
  feed: '/feed',
  feedDetail: '/feed/:id',
  feedChat: '/feed/:id/comments',
};
