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
    key: "SN",
    label: "SN"
  },
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
  }
]


export default async function Home() {
  const res = await fetch('http://localhost:3000/api/task', {
    cache:'no-store'
  });

  const data = await res.json();
  const tasks : TableType[] = data.tasks ?? [];

  console.log(tasks)

  return (
    <div className="">
      <Clock/>
      <PopupSection/>
      <Table columns={Columns} rows={tasks} />
    </div>
  );
}
