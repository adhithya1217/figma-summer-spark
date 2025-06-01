import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote, Plus } from "lucide-react";

interface NoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Notes = () => {
  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: '1',
      title: 'Meeting Ideas',
      content: 'Discuss quarterly goals\nReview budget allocations\nPlan team building event',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Project Thoughts',
      content: 'Consider using React for the frontend\nImplement proper error handling\nAdd unit tests',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [isAdding, setIsAdding] = useState(false);

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: NoteItem = {
        id: Date.now().toString(),
        title: newNote.title.trim(),
        content: newNote.content.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '' });
      setIsAdding(false);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <StickyNote className="h-5 w-5" />
              Notes
            </CardTitle>
            <CardDescription>
              Quick notes and ideas
            </CardDescription>
          </div>
          <Button onClick={() => setIsAdding(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Add new note form */}
        {isAdding && (
          <Card className="mb-4 border-dashed">
            <CardContent className="pt-4">
              <div className="space-y-3">
                <Input
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <Textarea
                  placeholder="Write your note here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={addNote} size="sm">Save</Button>
                  <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card key={note.id} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {note.content}
                </p>
                <p className="text-xs text-gray-500 mt-3">
                  {note.updatedAt.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {notes.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-500">
            <StickyNote className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No notes yet. Click "Add Note" to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
