export default function callAPIMiddleware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      const {
        types,
        api,
        shouldCallApi = () => true,
        payload = {}
      } = action;

      if (!types) {
        // Normal action: pass it on
        return next(action);
      }

      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.');
      }

      if (typeof api !== 'function') {
        throw new Error('Expected api to be a function.');
      }

      if (!shouldCallApi(getState())) {
        return;
      }

      const [requestType, successType, failureType] = types;

      dispatch({
        type: requestType
      });

      return api()
        .then(response => dispatch({
          response: response,
          type: successType
        }))
        .catch(error => dispatch({
          error: error,
          type: failureType
        }));
    };
  };
}
