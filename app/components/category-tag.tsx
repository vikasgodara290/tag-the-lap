import { Dot } from "lucide-react"

interface CategoryTagProps{
    category : string
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

const categoryArr = [
    {
        id : 1,
        category : "Entertainment",
        color : "red"
    },
    {
        id : 2,
        category : "Study",
        color : "pink"
    },
    {
        id : 3,
        category : "Health",
        color : "green"
    },
    {
        id : 4,
        category : "Job",
        color : "orange"
    },
]

export default function CategoryTag({ category }: CategoryTagProps) {
  const categoryObj = categoryArr.find(cat => cat.category === category);

  if (!categoryObj) return null; // safety

  // @ts-ignore
  const colors = tagColor[categoryObj.color];

  return (
    <div className={`flex items-center justify-center ${colors.bg} rounded-sm pr-3 ml-8`}>
      <Dot className={`relative bottom-px ${colors.dot}`} />
      <span className={`${colors.text} font-bold text-sm`}>
        {categoryObj.category}
      </span>
    </div>
  );
}
