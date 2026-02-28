import { Dot } from "lucide-react"
import { CategoryType } from "../lib/types";

interface CategoryTagProps{
    category : CategoryType[]
    taskCategory : number
}

const tagColor = {
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-400",
    dot: "text-orange-400",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-400",
    dot: "text-green-400",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-400",
    dot: "text-red-400",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-400",
    dot: "text-pink-400",
  },
} as const;

export default function CategoryTag({ taskCategory, category }: CategoryTagProps) {
  const categoryObj = category.find(cat => cat.id === taskCategory);

  if (!categoryObj) return null; 

  // @ts-ignore
  const colors = tagColor[categoryObj.categoryColor];

  return (
    <div className={`flex items-center justify-center ${colors.bg} rounded-sm pr-3 ml-8 max-sm:ml-2`}>
      <Dot className={`relative bottom-px ${colors.dot}`} />
      <span className={`${colors.text} font-bold text-sm`}>
        {categoryObj.category}
      </span>
    </div>
  );
}
