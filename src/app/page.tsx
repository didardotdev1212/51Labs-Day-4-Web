"use client";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
type TodoType = {
  id: number;
  name: string;
};

export default function page() {
  const [Todos, setTodos] = useState<TodoType[]>([]);
  const [IsDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [DeleteTodoID, setDeleteTodoID] = useState<Number | null>(null);
  const [Todo_Name, setTodoName] = useState("");

  const FetchTodo = async () => {
    await fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setTodos(data?.data);
        }
      });
  };

  useEffect(() => {
    FetchTodo();
  }, []);

  const AddTodoHandler = async () => {
    if (Todo_Name === "") return;

    const response = await fetch("http://localhost:5000/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: Todo_Name }),
    });
    const data = await response.json();
    if (data?.success) {
      FetchTodo();
    }
  };

  const DeleteTodoHandler = () => async () => {
    if (!DeleteTodoID) return;

    const response = await fetch(
      `http://localhost:5000/todos/delete/${DeleteTodoID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data?.success) {
      FetchTodo();
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <input
          value={Todo_Name}
          onChange={(e) => {
            setTodoName(e.target.value);
          }}
          placeholder="New Task Name"
          className="border-2 px-2"
        />
        <button
          className="bg-gray-200 w-1/3 cursor-pointer"
          onClick={AddTodoHandler}
        >
          Add
        </button>
      </div>

      {Todos?.map((todo) => {
        return (
          <div className="bg-gray-300 px-4 py-2 flex flex-row items-cennter justify-between">
            <p>{todo?.name}</p>

            <button
              onClick={() => {
                setIsDeleteDialogOpen(true);
                setDeleteTodoID(todo.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <AlertDialog
        open={IsDeleteDialogOpen}
        onOpenChange={(e) => {
          setIsDeleteDialogOpen(e);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500"
              onClick={DeleteTodoHandler()}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
