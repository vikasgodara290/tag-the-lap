import { Dot } from "lucide-react"

interface CategoryTagProps{
    category : string
}

export default function CategoryTag({category}: CategoryTagProps) {
    return (
        <div className="flex items-center justify-center bg-orange-100 rounded-sm pr-3 ml-8">
            <span>
                <Dot className="relative bottom-px text-orange-300"/>
            </span>
            <span className="text-orange-300 font-bold text-sm">
                {category}
            </span>
        </div>
    )
}