"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit2, X, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const storedPassword = localStorage.getItem("todoAppPassword");
    if (!storedPassword) {
      setIsNewUser(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (passwordInputRef.current && !isLoading) {
      passwordInputRef.current.focus();
    }
  }, [isNewUser, isLoading]);

  useEffect(() => {
    if (editInputRef.current && editingTodo) {
      editInputRef.current.focus();
    }
  }, [editingTodo]);

  const loadTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  };

  const saveTodos = (todosToSave: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(todosToSave));
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (isNewUser) {
      localStorage.setItem("todoAppPassword", password);
      setIsLoggedIn(true);
      setIsNewUser(false);
    } else {
      const storedPassword = localStorage.getItem("todoAppPassword");
      if (password === storedPassword) {
        setIsLoggedIn(true);
        setError("");
        loadTodos();
      } else {
        setError("Incorrect password");
      }
    }
    setPassword("");
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      if (
        todos.some(
          (todo) => todo.text.toLowerCase() === newTodo.trim().toLowerCase()
        )
      ) {
        setError("This todo already exists!");
        return;
      }
      const updatedTodos = [
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setNewTodo("");
      setError("");
    }
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const startEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const cancelEditTodo = () => {
    setEditingTodo(null);
  };

  const saveEditTodo = (id: number, newText: string) => {
    if (newText.trim() === "") {
      setError("Todo text cannot be empty!");
      return;
    }
    if (
      todos.some(
        (todo) =>
          todo.id !== id &&
          todo.text.toLowerCase() === newText.trim().toLowerCase()
      )
    ) {
      setError("This todo already exists!");
      return;
    }
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setEditingTodo(null);
    setError("");
  };

  const confirmDeleteTodo = (todo: Todo) => {
    setDeletingTodo(todo);
  };

  const cancelDeleteTodo = () => {
    setDeletingTodo(null);
  };

  const deleteTodo = () => {
    if (deletingTodo) {
      const updatedTodos = todos.filter((todo) => todo.id !== deletingTodo.id);
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setDeletingTodo(null);
      toast.success("Todo deleted successfully");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTodos([]);
    setPassword("");
    setError("");
  };

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault();
    // Check if the current password is correct
    const storedPassword = localStorage.getItem("todoAppPassword");
    if (currentPassword !== storedPassword) {
      setPasswordError("Incorrect current password");
      return;
    }

    if (newPassword.trim() !== "") {
      localStorage.setItem("todoAppPassword", newPassword);
      setIsChangingPassword(false);
      setNewPassword("");
      setCurrentPassword("");
      setPasswordError("");
      toast.success("Password changed successfully");
    } else {
      setPasswordError("New password cannot be empty!");
    }
  };

  const handleCancellPasswordChange = () => {
    setIsChangingPassword(false);
    setNewPassword("");
    setCurrentPassword("");
    setPasswordError("");
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Todo</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center container mx-auto mt-8 p-4">
        {!isLoggedIn ? (
          <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {isNewUser ? "Create Password" : "Enter Password"}
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  isNewUser ? "Create a password" : "Enter your password"
                }
                className="mb-4"
                required
                ref={passwordInputRef}
              />
              <Button type="submit" className="w-full">
                {isNewUser ? "Set Password" : "Login"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="max-w-md w-full mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Your Todos</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsChangingPassword(true)}
                  variant="outline"
                  size="icon"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </div>
            </div>
            <form onSubmit={addTodo} className="mb-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new todo"
                  className="flex-grow"
                />
                <Button type="submit">Add</Button>
              </div>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded"
                >
                  {editingTodo && editingTodo.id === todo.id ? (
                    <div className="flex flex-col items-center gap-2 flex-grow">
                      <Textarea
                        defaultValue={todo.text}
                        className="flex-grow bg-white"
                        ref={editTextareaRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveEditTodo(todo.id, e.currentTarget.value);
                          } else if (e.key === "Escape") {
                            cancelEditTodo();
                          }
                        }}
                      />
                      <div className="w-full flex flex-row-reverse gap-2">
                        <Button
                          onClick={() =>
                            saveEditTodo(
                              todo.id,
                              editTextareaRef.current?.value || ""
                            )
                          }
                        >
                          Save
                        </Button>
                        <Button variant="outline" onClick={cancelEditTodo}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`todo-${todo.id}`}
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                        />
                        <label
                          htmlFor={`todo-${todo.id}`}
                          className={`${
                            todo.completed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.text}
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEditTodo(todo)}
                          variant="ghost"
                          size="icon"
                          aria-label="Edit task"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => confirmDeleteTodo(todo)}
                          variant="ghost"
                          size="icon"
                          aria-label="Remove task"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="bg-gray-200 p-4 mt-8">
        <div className="container mx-auto text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Todo. Developed by{" "}
            <a target="_blank" className="font-semibold hover:underline" href="https://github.com/ahmedhussainmv">Ahmed Hussain</a>
          </p>
          <p>
            Built with <a target="_blank" className="font-semibold hover:underline" href="https://nextjs.org">Next.js</a>,{" "}
            <a target="_blank" className="font-semibold hover:underline" href="https://ui.shadcn.com">Shadcn</a>, and{" "}
            <a target="_blank" className="font-semibold hover:underline" href="https://tailwindcss.com">Tailwind CSS</a>
          </p>
        </div>
      </footer>

      <Dialog open={!!deletingTodo} onOpenChange={() => setDeletingTodo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this todo?
              <p className="font-semibold mt-2">{deletingTodo?.text}</p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDeleteTodo}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteTodo}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password below.
            </DialogDescription>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </DialogHeader>
          <form onSubmit={handleChangePassword}>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
              className="mb-4"
              required
            />
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="mb-4"
              required
            />
            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleCancellPasswordChange}>Cancel</Button>
              <Button type="submit">Change Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
