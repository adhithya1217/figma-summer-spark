
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
      <Card className="bg-[#F2F2F2] border-[#B6B09F] transition-all duration-300 hover:shadow-xl hover:scale-[1.05] hover:border-[#000000] group cursor-pointer transform">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-[#EAE4D5] transition-all duration-200">
          <CardTitle className="text-sm font-medium text-[#000000] group-hover:font-semibold transition-all duration-200">
            Active Tasks
          </CardTitle>
          <ListTodo className="h-4 w-4 text-[#B6B09F] group-hover:text-[#000000] group-hover:scale-110 transition-all duration-200" />
        </CardHeader>
        <CardContent className="group-hover:bg-[#EAE4D5] transition-all duration-200">
          <div className="text-2xl font-bold text-[#000000] group-hover:text-[#000000] transition-all duration-200">
            {activeTodosForDate.length}
          </div>
          <p className="text-xs text-[#B6B09F] group-hover:text-[#000000] transition-all duration-200">
            {selectedDate.toDateString() === new Date().toDateString() 
              ? `${activeTodosForDate.length} due today`
              : `for ${selectedDate.toLocaleDateString()}`
            }
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#F2F2F2] border-[#B6B09F] transition-all duration-300 hover:shadow-xl hover:scale-[1.05] hover:border-[#000000] group cursor-pointer transform">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-[#EAE4D5] transition-all duration-200">
          <CardTitle className="text-sm font-medium text-[#000000] group-hover:font-semibold transition-all duration-200">
            Completed Tasks
          </CardTitle>
          <Calendar className="h-4 w-4 text-[#B6B09F] group-hover:text-[#000000] group-hover:scale-110 transition-all duration-200" />
        </CardHeader>
        <CardContent className="group-hover:bg-[#EAE4D5] transition-all duration-200">
          <div className="text-2xl font-bold text-[#000000] group-hover:text-[#000000] transition-all duration-200">
            {completedTodosForDate.length}
          </div>
          <p className="text-xs text-[#B6B09F] group-hover:text-[#000000] transition-all duration-200">
            {selectedDate.toDateString() === new Date().toDateString() 
              ? `completed today`
              : `on ${selectedDate.toLocaleDateString()}`
            }
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#F2F2F2] border-[#B6B09F] transition-all duration-300 hover:shadow-xl hover:scale-[1.05] hover:border-[#000000] group cursor-pointer transform">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-[#EAE4D5] transition-all duration-200">
          <CardTitle className="text-sm font-medium text-[#000000] group-hover:font-semibold transition-all duration-200">
            Notes
          </CardTitle>
          <StickyNote className="h-4 w-4 text-[#B6B09F] group-hover:text-[#000000] group-hover:scale-110 transition-all duration-200" />
        </CardHeader>
        <CardContent className="group-hover:bg-[#EAE4D5] transition-all duration-200">
          <div className="text-2xl font-bold text-[#000000] group-hover:text-[#000000] transition-all duration-200">
            {notesForDate.length}
          </div>
          <p className="text-xs text-[#B6B09F] group-hover:text-[#000000] transition-all duration-200">
            {selectedDate.toDateString() === new Date().toDateString() 
              ? `notes for today`
              : `for ${selectedDate.toLocaleDateString()}`
            }
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#F2F2F2] border-[#B6B09F] transition-all duration-300 hover:shadow-xl hover:scale-[1.05] hover:border-[#000000] group cursor-pointer transform">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-[#EAE4D5] transition-all duration-200">
          <CardTitle className="text-sm font-medium text-[#000000] group-hover:font-semibold transition-all duration-200">
            Upcoming Events
          </CardTitle>
          <CalendarDays className="h-4 w-4 text-[#B6B09F] group-hover:text-[#000000] group-hover:scale-110 transition-all duration-200" />
        </CardHeader>
        <CardContent className="group-hover:bg-[#EAE4D5] transition-all duration-200">
          <div className="text-2xl font-bold text-[#000000] group-hover:text-[#000000] transition-all duration-200">
            {upcomingEvents.length}
          </div>
          <p className="text-xs text-[#B6B09F] group-hover:text-[#000000] transition-all duration-200">
            {nextEvent ? `Next: ${nextEvent.title}` : 'No upcoming events'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
