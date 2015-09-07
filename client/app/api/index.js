import rest from 'rest';
import prefix from 'rest/interceptor/pathPrefix';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';

const client = rest.wrap(errorCode,{ code: 400 }).wrap(mime, { mime: 'application/json' });

let EventsClient = client.wrap(prefix, { prefix: '/v1/events' });

module.exports = {
  eventsApi: require('./eventsApi')(EventsClient)
}
