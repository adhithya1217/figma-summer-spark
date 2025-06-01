
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarIcon, Plus, Edit, Trash2 } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

export const EventManager = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useDashboard();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventTime, setEventTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventTime.trim()) return;

    if (editingEvent) {
      updateEvent(editingEvent, eventTitle, eventDate, eventTime);
      setEditingEvent(null);
    } else {
      addEvent(eventTitle, eventDate, eventTime);
    }

    setEventTitle("");
    setEventTime("");
    setEventDate(new Date());
    setIsDialogOpen(false);
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event.id);
    setEventTitle(event.title);
    setEventDate(event.date);
    setEventTime(event.time);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteEvent(id);
  };

  const resetForm = () => {
    setEditingEvent(null);
    setEventTitle("");
    setEventTime("");
    setEventDate(new Date());
  };

  return (
    <Card className="h-fit bg-[#F2F2F2] border-[#B6B09F] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#000000]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-[#000000]">
            <CalendarIcon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
            Events
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button 
                size="sm" 
                className="bg-[#EAE4D5] text-[#000000] hover:bg-[#B6B09F] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
              >
                <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#F2F2F2] border-[#B6B09F]">
              <DialogHeader>
                <DialogTitle className="text-[#000000]">
                  {editingEvent ? "Edit Event" : "Add New Event"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Event title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="bg-white border-[#B6B09F] focus:border-[#000000] transition-all duration-200 hover:border-[#B6B09F] hover:shadow-md"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-white border-[#B6B09F] hover:bg-[#EAE4D5] hover:border-[#000000] transition-all duration-200 hover:shadow-md"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(eventDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#F2F2F2] border-[#B6B09F]">
                    <Calendar
                      mode="single"
                      selected={eventDate}
                      onSelect={(date) => date && setEventDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="bg-white border-[#B6B09F] focus:border-[#000000] transition-all duration-200 hover:border-[#B6B09F] hover:shadow-md"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-[#000000] text-[#F2F2F2] hover:bg-[#B6B09F] hover:text-[#000000] transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                >
                  {editingEvent ? "Update Event" : "Add Event"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription className="text-[#B6B09F]">
          {events.length === 0 ? "No events scheduled" : `${events.length} event(s) scheduled`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {events.length === 0 ? (
            <div className="text-center py-8 text-[#B6B09F] animate-fade-in">
              <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50 transition-all duration-300 hover:opacity-80 hover:scale-110" />
              <p className="transition-colors duration-200">No upcoming events</p>
              <p className="text-sm mt-1 transition-colors duration-200">Click the + button to add your first event</p>
            </div>
          ) : (
            events
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((event, index) => (
                <div
                  key={event.id}
                  className="p-3 bg-[#EAE4D5] rounded-lg border border-[#B6B09F] group hover:bg-[#B6B09F] hover:border-[#000000] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg transform cursor-pointer animate-slide-down"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 transition-all duration-200">
                      <h4 className="font-medium text-[#000000] group-hover:text-white transition-all duration-200 group-hover:font-semibold">
                        {event.title}
                      </h4>
                      <p className="text-sm text-[#B6B09F] group-hover:text-[#F2F2F2] transition-all duration-200">
                        {format(event.date, "MMM dd, yyyy")} at {event.time}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(event)}
                        className="h-8 w-8 p-0 hover:bg-[#F2F2F2] hover:text-[#000000] transition-all duration-200 hover:scale-125 transform hover:rotate-12"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(event.id)}
                        className="h-8 w-8 p-0 hover:bg-red-500 hover:text-white transition-all duration-200 hover:scale-125 transform hover:rotate-12"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
