import { LOAD_EVENTS, CREATE_EVENT, ADD_EVENT } from 'constants/EventConstants';
const [a, successLoadEvent] = LOAD_EVENTS;
const [b, successCreateEvent] = CREATE_EVENT;


function getInit() {
  return [ ];
}

export default function events(state=getInit(), action) {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, action.event];
    case successCreateEvent:
      return [...state, action.response.entity];
    case successLoadEvent:
      return [...state, ...action.response.entity];
    default:
      return state;
  }
}
