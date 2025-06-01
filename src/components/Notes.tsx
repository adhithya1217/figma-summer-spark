
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote, Plus, Calendar } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";

export const Notes = () => {
  const { selectedDate, notes, setNotes, addNote } = useDashboard();
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [noteDate, setNoteDate] = useState(selectedDate.toISOString().split('T')[0]);
  const [isAdding, setIsAdding] = useState(false);

  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  // Filter notes for selected date
  const notesForDate = notes.filter(note => isSameDay(note.date, selectedDate));

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      addNote(newNote.title, newNote.content, new Date(noteDate));
      setNewNote({ title: '', content: '' });
      setNoteDate(selectedDate.toISOString().split('T')[0]);
      setIsAdding(false);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Card className="bg-[#F2F2F2] border-[#B6B09F] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#000000]">
      <CardHeader className="transition-all duration-200 hover:bg-[#EAE4D5]">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-[#000000]">
              <StickyNote className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
              Notes
            </CardTitle>
            <CardDescription className="text-[#B6B09F] transition-colors duration-200 hover:text-[#000000]">
              Notes for {selectedDate.toLocaleDateString()} ({notesForDate.length} notes)
            </CardDescription>
          </div>
          <Button 
            onClick={() => setIsAdding(true)} 
            size="sm"
            className="bg-[#EAE4D5] text-[#000000] hover:bg-[#B6B09F] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
          >
            <Plus className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Add new note form */}
        {isAdding && (
          <Card className="mb-4 border-dashed border-[#B6B09F] bg-[#EAE4D5] transition-all duration-300 hover:bg-[#B6B09F] hover:border-[#000000] animate-slide-down">
            <CardContent className="pt-4">
              <div className="space-y-3">
                <Input
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="bg-white border-[#B6B09F] focus:border-[#000000] transition-all duration-200 hover:border-[#B6B09F] hover:shadow-md"
                />
                <Textarea
                  placeholder="Write your note here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={3}
                  className="bg-white border-[#B6B09F] focus:border-[#000000] transition-all duration-200 hover:border-[#B6B09F] hover:shadow-md"
                />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#B6B09F] transition-colors duration-200 hover:text-[#000000]" />
                  <Input
                    type="date"
                    value={noteDate}
                    onChange={(e) => setNoteDate(e.target.value)}
                    className="w-auto bg-white border-[#B6B09F] focus:border-[#000000] transition-all duration-200 hover:border-[#B6B09F] hover:shadow-md"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddNote} 
                    size="sm"
                    className="bg-[#000000] text-[#F2F2F2] hover:bg-[#B6B09F] hover:text-[#000000] transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                  >
                    Save
                  </Button>
                  <Button 
                    onClick={() => setIsAdding(false)} 
                    variant="outline" 
                    size="sm"
                    className="border-[#B6B09F] text-[#000000] hover:bg-[#B6B09F] hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notesForDate.map((note, index) => (
            <Card 
              key={note.id} 
              className="h-fit bg-[#EAE4D5] border-[#B6B09F] group hover:bg-[#B6B09F] hover:border-[#000000] transition-all duration-300 hover:scale-[1.05] hover:shadow-lg transform cursor-pointer animate-slide-down"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-[#000000] group-hover:text-white transition-all duration-200 group-hover:font-semibold">
                    {note.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-white hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 hover:scale-125"
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#000000] whitespace-pre-line group-hover:text-[#F2F2F2] transition-all duration-200">
                  {note.content}
                </p>
                <p className="text-xs text-[#B6B09F] mt-3 group-hover:text-[#F2F2F2] transition-all duration-200">
                  {note.date.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {notesForDate.length === 0 && !isAdding && (
          <div className="text-center py-8 text-[#B6B09F] animate-fade-in">
            <StickyNote className="h-12 w-12 mx-auto mb-3 opacity-30 transition-all duration-300 hover:opacity-80 hover:scale-110" />
            <p className="transition-colors duration-200 hover:text-[#000000]">
              No notes for {selectedDate.toLocaleDateString()}. Click "Add Note" to get started!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
