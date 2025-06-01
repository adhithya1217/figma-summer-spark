
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
    <Card className="h-fit bg-[#F2F2F2] border-[#B6B09F] transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#000000]">
      <CardHeader className="transition-all duration-200 hover:bg-[#EAE4D5]">
        <CardTitle className="flex items-center gap-2 text-[#000000]">
          <ListTodo className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          To-Do List
        </CardTitle>
        <CardDescription className="text-[#B6B09F]">
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
              className="flex-1 bg-white border-[#B6B09F] focus:border-[#000000] transition-all duration-200 hover:border-[#B6B09F] hover:shadow-md"
            />
            <Button 
              onClick={handleAddTodo} 
              size="sm"
              className="bg-[#EAE4D5] text-[#000000] hover:bg-[#B6B09F] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg transform"
            >
              <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#B6B09F] transition-colors duration-200 hover:text-[#000000]" />
            <Input
              type="date"
              value={newTodoDueDate}
              onChange={(e) => setNewTodoDueDate(e.target.value)}
              className="w-auto bg-white border-[#B6B09F] focus:border-[#000000] transition-all duration-200 hover:border-[#B6B09F] hover:shadow-md"
            />
          </div>
        </div>

        {/* Active todos */}
        <div className="space-y-2">
          {activeTodos.map((todo, index) => (
            <div 
              key={todo.id} 
              className="flex items-center gap-3 p-3 bg-[#EAE4D5] rounded-lg border border-[#B6B09F] group hover:bg-[#B6B09F] hover:border-[#000000] transition-all duration-300 hover:scale-[1.03] hover:shadow-lg transform cursor-pointer animate-slide-down"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="transition-all duration-200 hover:scale-110"
              />
              <span className="flex-1 text-sm text-[#000000] group-hover:text-white transition-all duration-200 group-hover:font-medium">
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-white hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 hover:scale-125"
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        {/* Completed todos */}
        {completedTodos.length > 0 && (
          <div className="border-t pt-4 border-[#B6B09F]">
            <h4 className="text-sm font-medium text-[#B6B09F] mb-2 transition-colors duration-200 hover:text-[#000000]">Completed</h4>
            <div className="space-y-2">
              {completedTodos.map((todo, index) => (
                <div 
                  key={todo.id} 
                  className="flex items-center gap-3 p-3 bg-[#EAE4D5] rounded-lg opacity-60 border border-[#B6B09F] group hover:bg-[#B6B09F] hover:border-[#000000] hover:opacity-80 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg transform cursor-pointer animate-slide-down"
                  style={{ animationDelay: `${(activeTodos.length + index) * 100}ms` }}
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="transition-all duration-200 hover:scale-110"
                  />
                  <span className="flex-1 text-sm line-through text-[#000000] group-hover:text-white transition-all duration-200">
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-white hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 hover:scale-125"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {todosForDate.length === 0 && (
          <div className="text-center py-8 text-[#B6B09F] animate-fade-in">
            <ListTodo className="h-12 w-12 mx-auto mb-3 opacity-30 transition-all duration-300 hover:opacity-80 hover:scale-110" />
            <p className="transition-colors duration-200 hover:text-[#000000]">No tasks for {selectedDate.toLocaleDateString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
