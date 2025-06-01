
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
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Calendar
        </CardTitle>
        <CardDescription>
          Selected: {formatDate(selectedDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CalendarUI
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border w-full"
        />
        
        {/* Upcoming events */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
          <div className="space-y-2 text-sm text-gray-600">
            {upcomingEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                <div className="font-medium">{event.title}</div>
                <div className="text-xs">
                  {event.date.toLocaleDateString()} at {event.time}
                </div>
              </div>
            ))}
            {upcomingEvents.length === 0 && (
              <div className="text-center py-2 text-gray-500">
                No upcoming events
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
