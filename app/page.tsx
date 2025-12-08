'use server'
import Clock from "./components/clock";
import PopupSection from "./components/popup-section";
import Table from "./components/table";

interface TableType{
  id:number,
  task: string,
  category: string,
  startTime: Date,
  createdAt: Date
}

const Columns : {key: string, label: string}[] = [
  {
    key : "task",
    label : "Task"
  },
  {
    key : "category",
    label : "Category"
  },
  {
    key : "startTime",
    label : "Start Time"
  },
  {
    key : "endTime",
    label : "End Time"
  },
  {
    key : "duration",
    label : "Duration"
  }
]


export default async function Home() {
  const res = await fetch('http://localhost:3000/api/task', {
    cache:'no-store'
  });

  const data = await res.json();
  const tasks : TableType[] = data.tasks ?? [];

  const formattedTasks = tasks.map(task => ({
    ...task,
    startTime: formatDate( new Date(task.startTime) ),
    createdAt: formatDate( new Date(task.createdAt) ),
    duration: new Date( task.startTime ).getHours() - new Date( task.createdAt ).getHours()
  }))

  return (
    <div className="">
      <Clock/>
      <PopupSection/>
      <Table columns={Columns} rows={formattedTasks} />
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date)
    .replace(" ", "-")
    .replace(",", "");
}
