import { parseISO } from 'date-fns';

export const convertEvents = (events = []) => {
  return events.map(event => ({
    ...event,
    start: parseISO(event.start),
    end: parseISO(event.end),
  }));
};
