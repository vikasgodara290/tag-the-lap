import Button from "./button";

export default function AddTaskPopup(){
    return (
        <div className="border border-black w-96 h-72 grid place-items-center">
            <div className="w-full flex justify-end">
                <div className="border border-black w-fit px-1 items-end mx-1">
                    close
                </div>
            </div>
            {/* <div className="">
                <textarea name="" id="" className="border border-black w-52"></textarea>
            </div>
            <div className="">
                <select name="" id="">
                    <option value="">Entertainment</option>
                    <option value="">Job</option>
                    <option value="">Study</option>
                    <option value="">Health</option>
                </select>
            </div>
            <div className="">
                <Button innerText={'Add'}/>
            </div> */}
        </div>
    )
}