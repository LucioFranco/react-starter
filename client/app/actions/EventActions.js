import { ADD_EVENT, LOAD_EVENTS, CREATE_EVENT } from 'constants/EventConstants';
import { eventsApi } from '../api';

export function addEvent(event) {
  return {
    type: ADD_EVENT,
    event
  }
}

export function createEvent(event) {
  return {
    types: CREATE_EVENT,
    api: eventsApi.create(event)
  }
}

export function loadEvents() {
  return {
    types: LOAD_EVENTS,
    api: eventsApi.getAll()
  }
}
