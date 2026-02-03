'use server'

import PopupSection from "./components/popup-section";
import { CategoryType, TaskType } from "./lib/types";

export default async function Home() {
  const { tasks } = await getTasks();
  const { category } = await getCategory();

  console.log("Task From Page: ", tasks);
  console.log("Category From Page: ", category);

  return (
    <div className="">
      <PopupSection 
        tasks={tasks}
        category={category}  
      />
    </div>
  );
}

async function getTasks(): Promise<{tasks : TaskType[]}> {
  const res = await fetch('http://localhost:3000/api/task', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return res.json();
}

async function getCategory(): Promise<{category : CategoryType[]}> {
  const res = await fetch('http://localhost:3000/api/category', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return res.json();
}