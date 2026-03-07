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
  
    console.log('from page session: ', session, session.expires)

  const { tasks } = await getTasks(noOfDays, session.user.id);
  const { category } = await getCategory();

  console.log('category: sdfsdfsdfsdf: ',category)

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
  const res = await fetch(`http://localhost:3000/api/task?noOfDays=${noOfDays}`, {
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
  const res = await fetch('http://localhost:3000/api/category', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return res.json();
}