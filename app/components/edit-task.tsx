import { Edit, SquareCheckBig, Trash2 } from "lucide-react";
import { useState } from "react";

export default function EditIcon(){
    const [isInEdit, setIsInEdit] = useState(false);

    const handleEditTask = () => {
        
    }

    return(
        <div className="">
            {
                isInEdit ?
                <span className="flex justify-center items-center gap-3">
                    <SquareCheckBig/> 
                    <Trash2/>
                </span>
                : <Edit onClick={handleEditTask}/>
            }
        </div>
    )
}