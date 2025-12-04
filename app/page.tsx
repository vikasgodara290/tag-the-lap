'use server'
import Clock from "./components/clock";
import PopupSection from "./components/popup-section";
import Table from "./components/table";

interface TableType{
  task: string,
  category: string
}

const Columns =[
  {
    key : "task",
    label : "Task"
  },
  {
    key : "category",
    label : "Category"
  }
]
const Rows: TableType[] = [
  {
    task : "study",
    category : "wealth"
  },
  {
    task : "exercise",
    category : "health"
  }
]

export default async function Home() {
  return (
    <div className="">
      <Clock/>
      <PopupSection/>
      <Table columns={Columns} rows={Rows} />
    </div>
  );
}
