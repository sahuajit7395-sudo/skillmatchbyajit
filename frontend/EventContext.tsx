import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { Alert } from 'react-native';
import { getApiBaseUrl } from '@/constants/api';
import { useAuth } from '@/AuthContext';

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
  isLoading: boolean;
  addEvent: (title: string, description: string, status: EventStatus) => Promise<void>;
  updateEventStatus: (eventId: string, status: EventStatus) => Promise<void>;
  assignTask: (eventId: string, volunteerName: string) => Promise<void>;
}

const EventContext = createContext<EventContextValue | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const { adminToken, clearAdminSession } = useAuth();
  const adminTokenRef = useRef(adminToken);
  adminTokenRef.current = adminToken;

  const [events, setEvents] = useState<Event[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiJson = useCallback(
    async <T,>(
      path: string,
      init?: RequestInit & { auth?: boolean },
    ): Promise<T> => {
      const { auth, ...rest } = init ?? {};
      const headers: Record<string, string> = {
        ...(rest.headers as Record<string, string>),
      };
      if (rest.body != null) {
        headers['Content-Type'] = 'application/json';
      }
      if (auth) {
        const token = adminTokenRef.current;
        if (!token) {
          throw new Error('Admin session required. Sign in from Admin Access.');
        }
        headers['Authorization'] = `Bearer ${token}`;
      }

      const base = getApiBaseUrl();
      const res = await fetch(`${base}${path}`, {
        ...rest,
        headers,
      });
      const data = (await res.json().catch(() => ({}))) as T & { error?: string };

      if (res.status === 401 && auth) {
        await clearAdminSession();
        throw new Error('Session expired. Please sign in again as admin.');
      }

      if (!res.ok) {
        throw new Error(data.error || res.statusText || 'Request failed');
      }
      return data as T;
    },
    [clearAdminSession],
  );

  const loadInitial = useCallback(async () => {
    setIsLoading(true);
    try {
      const [eData, vData] = await Promise.all([
        apiJson<{ events: Event[] }>('/api/events'),
        apiJson<{ volunteers: Volunteer[] }>('/api/volunteers'),
      ]);
      setEvents(eData.events ?? []);
      setVolunteers(vData.volunteers ?? []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(
        '[SkillMatch] API unreachable — from the repo root run `npm run server`, then reload the app (Android: http://10.0.2.2:3001).',
        msg,
      );
      setEvents([]);
      setVolunteers([]);
    } finally {
      setIsLoading(false);
    }
  }, [apiJson]);

  useEffect(() => {
    void loadInitial();
  }, [loadInitial]);

  const addEvent = async (title: string, description: string, status: EventStatus) => {
    try {
      const { event } = await apiJson<{ event: Event }>('/api/events', {
        method: 'POST',
        body: JSON.stringify({ title, description, status }),
        auth: true,
      });
      setEvents((prev) => [event, ...prev]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      Alert.alert('Could not create event', msg);
      throw e;
    }
  };

  const updateEventStatus = async (eventId: string, status: EventStatus) => {
    try {
      const { event } = await apiJson<{ event: Event }>(
        `/api/events/${encodeURIComponent(eventId)}/status`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status }),
          auth: true,
        },
      );
      setEvents((prev) => prev.map((ev) => (ev.id === event.id ? event : ev)));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      Alert.alert('Could not update status', msg);
      throw e;
    }
  };

  const assignTask = async (eventId: string, volunteerName: string) => {
    try {
      const { event } = await apiJson<{ event: Event }>(
        `/api/events/${encodeURIComponent(eventId)}/assign`,
        {
          method: 'PATCH',
          body: JSON.stringify({ volunteerName }),
          auth: true,
        },
      );
      setEvents((prev) => prev.map((ev) => (ev.id === event.id ? event : ev)));
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      Alert.alert('Could not assign task', msg);
      throw e;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        volunteers,
        isLoading,
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
