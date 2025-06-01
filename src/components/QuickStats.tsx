
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, CalendarDays, StickyNote, Calendar } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";

export const QuickStats = () => {
  const { selectedDate, todos, notes, events } = useDashboard();

  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  // Filter data based on selected date
  const todosForDate = todos.filter(todo => isSameDay(todo.dueDate, selectedDate));
  const activeTodosForDate = todosForDate.filter(todo => !todo.completed);
  const completedTodosForDate = todosForDate.filter(todo => todo.completed);
  const notesForDate = notes.filter(note => isSameDay(note.date, selectedDate));
  
  // Upcoming events (after selected date)
  const upcomingEvents = events.filter(event => event.date >= selectedDate);
  const nextEvent = upcomingEvents.sort((a, b) => a.date.getTime() - b.date.getTime())[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeTodosForDate.length}</div>
          <p className="text-xs text-muted-foreground">
            {selectedDate.toDateString() === new Date().toDateString() 
              ? `${activeTodosForDate.length} due today`
              : `for ${selectedDate.toLocaleDateString()}`
            }
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedTodosForDate.length}</div>
          <p className="text-xs text-muted-foreground">
            {selectedDate.toDateString() === new Date().toDateString() 
              ? `completed today`
              : `on ${selectedDate.toLocaleDateString()}`
            }
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notes</CardTitle>
          <StickyNote className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{notesForDate.length}</div>
          <p className="text-xs text-muted-foreground">
            {selectedDate.toDateString() === new Date().toDateString() 
              ? `notes for today`
              : `for ${selectedDate.toLocaleDateString()}`
            }
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingEvents.length}</div>
          <p className="text-xs text-muted-foreground">
            {nextEvent ? `Next: ${nextEvent.title}` : 'No upcoming events'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
