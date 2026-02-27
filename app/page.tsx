'use server'

import { redirect } from "next/navigation";
import PopupSection from "./components/dashboard";
import { CategoryType, TaskType } from "./lib/types";
import { getServerSession } from "next-auth";

export default async function Home() {
  const { tasks } = await getTasks();
  const { category } = await getCategory();

  const session = await getServerSession();

  if(!session?.user){
    redirect('/api/auth/signin')
  }

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
  const res = await fetch('http://localhost:3000/api/task?noOfDays=15', {
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