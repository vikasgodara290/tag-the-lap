import { Ellipsis } from "lucide-react";

export default function Task() {
    return(
        <div className="h-16 flex items-center justify-between p-6 border-t">
            <div className="flex-1">
                I am building log the day application.
            </div>
            <div className="flex items-center justify-center">
                <div className="mx-2">
                    12:34 - 15:42
                </div>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <div className="mx-2">
                    01:32:54
                </div>
                <span className="border h-4 rounded-2xl border-gray-300 mx-2"></span>
                <div className="">
                    <Ellipsis size={18} className="relative bottom-px"/>
                </div>
            </div>
        </div>
    )
}