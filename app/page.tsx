'use server'
import Clock from "./components/clock";
import PopupSection from "./components/popup-section";
import Table from "./components/table";

interface TableType{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  endTime: null | Date,
  duration: number | null,
  createdAt: Date
}

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/task', {
    cache:'no-store'
  });

  const data = await res.json();
  const tasks : TableType[] = data.tasks ?? [];

  const formattedTasks = tasks.map(task => ({
    ...task,
    startTime: new Date(task.startTime) ,
    endTime: task.endTime != null ? new Date(task.endTime) : null,
    duration: task.endTime != null ?  new Date( task.endTime).getTime() - new Date( task.startTime ).getTime() : null
  }));

  console.log(formattedTasks)

  return (
    <div className="">
      {/* <Clock/> */}
      <PopupSection tasks={formattedTasks}/>
    </div>
  );
}

function formatDate(date: Date) {
  console.log(date)
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date)
    .replace(" ", "-")
    .replace(",", "");
}
