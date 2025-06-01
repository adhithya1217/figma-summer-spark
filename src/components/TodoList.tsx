
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, ListTodo } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Review project proposals', completed: false, createdAt: new Date() },
    { id: '2', text: 'Call client about feedback', completed: true, createdAt: new Date() },
    { id: '3', text: 'Update portfolio website', completed: false, createdAt: new Date() },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
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

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListTodo className="h-5 w-5" />
          To-Do List
        </CardTitle>
        <CardDescription>
          {activeTodos.length} active tasks, {completedTodos.length} completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new todo */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
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
      </CardContent>
    </Card>
  );
};
