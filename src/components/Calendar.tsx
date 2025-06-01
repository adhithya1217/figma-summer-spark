
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { useDashboard } from "@/contexts/DashboardContext";

export const Calendar = () => {
  const { selectedDate, setSelectedDate, events } = useDashboard();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Filter events for upcoming dates
  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="h-fit bg-[#F2F2F2] border-[#B6B09F] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#000000]">
      <CardHeader className="transition-all duration-200 hover:bg-[#EAE4D5]">
        <CardTitle className="flex items-center gap-2 text-[#000000]">
          <CalendarIcon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          Calendar
        </CardTitle>
        <CardDescription className="text-[#B6B09F] transition-colors duration-200 hover:text-[#000000]">
          Selected: {formatDate(selectedDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CalendarUI
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border border-[#B6B09F] w-full bg-white hover:border-[#000000] transition-all duration-300 hover:shadow-lg"
        />
        
        {/* Upcoming events */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2 text-[#000000] transition-colors duration-200 hover:text-[#B6B09F]">Upcoming Events</h4>
          <div className="space-y-2 text-sm">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <div 
                key={event.id} 
                className="p-2 bg-[#EAE4D5] rounded border-l-4 border-[#B6B09F] transition-all duration-300 hover:bg-[#B6B09F] hover:border-[#000000] hover:scale-[1.03] hover:shadow-md transform cursor-pointer animate-slide-down"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-medium text-[#000000] transition-colors duration-200 hover:text-white">
                  {event.title}
                </div>
                <div className="text-xs text-[#B6B09F] transition-colors duration-200 hover:text-[#F2F2F2]">
                  {event.date.toLocaleDateString()} at {event.time}
                </div>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <div className="text-center py-2 text-[#B6B09F] animate-fade-in">
                <p className="transition-colors duration-200 hover:text-[#000000]">No upcoming events</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
