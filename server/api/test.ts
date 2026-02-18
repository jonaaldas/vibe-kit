import defineAuthenticatedEventHandler from '../utils/defineAuthHandler';

export default defineAuthenticatedEventHandler((event) => {
  return { msg: 'Hello World', user: event.context.user };
});
