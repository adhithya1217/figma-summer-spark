
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, ListTodo, Calendar } from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";

export const TodoList = () => {
  const { selectedDate, todos, setTodos, addTodo } = useDashboard();
  const [newTodo, setNewTodo] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState(selectedDate.toISOString().split('T')[0]);

  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  // Filter todos for selected date
  const todosForDate = todos.filter(todo => isSameDay(todo.dueDate, selectedDate));
  const activeTodos = todosForDate.filter(todo => !todo.completed);
  const completedTodos = todosForDate.filter(todo => todo.completed);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo, new Date(newTodoDueDate));
      setNewTodo('');
      setNewTodoDueDate(selectedDate.toISOString().split('T')[0]);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListTodo className="h-5 w-5" />
          To-Do List
        </CardTitle>
        <CardDescription>
          {selectedDate.toLocaleDateString()} - {activeTodos.length} active, {completedTodos.length} completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new todo */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              className="flex-1"
            />
            <Button onClick={handleAddTodo} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Input
              type="date"
              value={newTodoDueDate}
              onChange={(e) => setNewTodoDueDate(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>

        {/* Active todos */}
        <div className="space-y-2">
          {activeTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <span className="flex-1 text-sm">{todo.text}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        {/* Completed todos */}
        {completedTodos.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Completed</h4>
            <div className="space-y-2">
              {completedTodos.map((todo) => (
                <div key={todo.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg opacity-60">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span className="flex-1 text-sm line-through">{todo.text}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {todosForDate.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ListTodo className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No tasks for {selectedDate.toLocaleDateString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
