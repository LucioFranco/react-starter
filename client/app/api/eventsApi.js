
export default function (client) {
  return {
    getAll: () => ()=> {
      return client({
        method: 'GET',
        path: '/'
      });
    },
    create: (event) => () => {
      return client({
        method: 'POST',
        path: '/',
        entity: event
      });
    }
  }
}
