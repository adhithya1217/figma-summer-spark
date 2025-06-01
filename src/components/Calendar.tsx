
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";

export const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const today = new Date();
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          Calendar
        </CardTitle>
        <CardDescription>
          Today is {formatDate(today)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CalendarUI
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-full"
        />
        
        {/* Upcoming events placeholder */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
              <div className="font-medium">Team Meeting</div>
              <div className="text-xs">Tomorrow at 2:00 PM</div>
            </div>
            <div className="p-2 bg-green-50 rounded border-l-4 border-green-400">
              <div className="font-medium">Project Deadline</div>
              <div className="text-xs">Friday at 5:00 PM</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
