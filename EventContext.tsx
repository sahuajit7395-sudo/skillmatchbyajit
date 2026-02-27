import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed';

export interface Event {
  id: string;
  title: string;
  description: string;
  status: EventStatus;
  assignedTo?: string;
}

export interface Volunteer {
  id: string;
  name: string;
}

interface EventContextValue {
  events: Event[];
  volunteers: Volunteer[];
  addEvent: (title: string, description: string, status: EventStatus) => void;
  updateEventStatus: (eventId: string, status: EventStatus) => void;
  assignTask: (eventId: string, volunteerName: string) => void;
}

const EventContext = createContext<EventContextValue | undefined>(undefined);

const INITIAL_VOLUNTEERS: Volunteer[] = [
  { id: '1', name: 'Rahul' },
  { id: '2', name: 'Priya' },
];

const INITIAL_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Flood Relief Coordination',
    description: 'Coordinate relief material distribution across key zones.',
    status: 'Upcoming',
  },
  {
    id: 'e2',
    title: 'Medical Camp Setup',
    description: 'Assist in setting up first-aid and triage tents.',
    status: 'Ongoing',
    assignedTo: 'Rahul',
  },
];

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [volunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);

  const addEvent = (title: string, description: string, status: EventStatus) => {
    const newEvent: Event = {
      id: `e-${Date.now()}`,
      title,
      description,
      status,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateEventStatus = (eventId: string, status: EventStatus) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              status,
            }
          : event,
      ),
    );
  };

  const assignTask = (eventId: string, volunteerName: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              assignedTo: volunteerName,
            }
          : event,
      ),
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        volunteers,
        addEvent,
        updateEventStatus,
        assignTask,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = (): EventContextValue => {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return ctx;
};



