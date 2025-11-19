'use server'
import Clock from "./components/clock";
import PopupSection from "./components/popup-section";

export default async function Home() {
  return (
    <div className="">
      <Clock/>
      <PopupSection/>
    </div>
  );
}
