'use server'

import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
import PopupSection from "./components/dashboard";
import { CategoryType, TaskType } from "./lib/types";
import { getServerSession } from "next-auth";

export default async function Home() {
  const noOfDays = 15;
  const session = await getServerSession(authOptions)
  
  if(!session?.user){
    redirect('/api/auth/signin')
  }

  const { tasks } = await getTasks(noOfDays, session.user.id);
  const { category } = await getCategory();

  return (
    <div className="">
      <PopupSection 
        tasks={tasks}
        category={category}
        noOfDays={noOfDays}  
      />
    </div>
  );
}

async function getTasks(noOfDays : number, userId : string): Promise<{tasks : TaskType[]}> {
  const url = process.env.BASE_URL;
  const res = await fetch(`${url}/api/task?noOfDays=${noOfDays}`, {
    cache: 'no-store',
    headers: {
      "userId" : userId,
      "noOfDays" : noOfDays.toString()
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return res.json();
}

async function getCategory(): Promise<{category : CategoryType[]}> {
  const url = process.env.BASE_URL;
  const res = await fetch(`${url}/api/category`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return res.json();
}