import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date;
}

interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
}

interface EventItem {
  id: string;
  title: string;
  date: Date;
  time: string;
}

interface DashboardContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  todos: TodoItem[];
  setTodos: (todos: TodoItem[]) => void;
  notes: NoteItem[];
  setNotes: (notes: NoteItem[]) => void;
  events: EventItem[];
  setEvents: (events: EventItem[]) => void;
  addTodo: (text: string, dueDate: Date) => void;
  addNote: (title: string, content: string, date: Date) => void;
  addEvent: (title: string, date: Date, time: string) => void;
  updateEvent: (id: string, title: string, date: Date, time: string) => void;
  deleteEvent: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Sample data with dates
  const [todos, setTodos] = useState<TodoItem[]>([
    { 
      id: '1', 
      text: 'Review project proposals', 
      completed: false, 
      createdAt: new Date(), 
      dueDate: new Date() 
    },
    { 
      id: '2', 
      text: 'Call client about feedback', 
      completed: true, 
      createdAt: new Date(), 
      dueDate: new Date() 
    },
    { 
      id: '3', 
      text: 'Update portfolio website', 
      completed: false, 
      createdAt: new Date(), 
      dueDate: new Date(Date.now() + 86400000) // Tomorrow
    },
  ]);

  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: '1',
      title: 'Meeting Ideas',
      content: 'Discuss quarterly goals\nReview budget allocations\nPlan team building event',
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date(),
    },
    {
      id: '2',
      title: 'Project Thoughts',
      content: 'Consider using React for the frontend\nImplement proper error handling\nAdd unit tests',
      createdAt: new Date(),
      updatedAt: new Date(),
      date: new Date(Date.now() + 86400000), // Tomorrow
    },
  ]);

  const [events, setEvents] = useState<EventItem[]>([]);

  const addTodo = (text: string, dueDate: Date) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      dueDate,
    };
    setTodos([newTodo, ...todos]);
  };

  const addNote = (title: string, content: string, date: Date) => {
    const newNote: NoteItem = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      date,
    };
    setNotes([newNote, ...notes]);
  };

  const addEvent = (title: string, date: Date, time: string) => {
    const newEvent: EventItem = {
      id: Date.now().toString(),
      title: title.trim(),
      date,
      time,
    };
    setEvents([newEvent, ...events]);
  };

  const updateEvent = (id: string, title: string, date: Date, time: string) => {
    setEvents(events.map(event => 
      event.id === id 
        ? { ...event, title: title.trim(), date, time }
        : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <DashboardContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        todos,
        setTodos,
        notes,
        setNotes,
        events,
        setEvents,
        addTodo,
        addNote,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
