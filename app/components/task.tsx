import { Ellipsis } from 'lucide-react';
import CategoryTag from './category-tag';
import { CategoryType, TaskType } from '../lib/types';
import { getDuration } from '../utils/duration';
import { cn } from '../utils/twMerge';

interface TaskProps {
  task: TaskType;
  category: CategoryType[];
}

export default function Task({ task, category }: TaskProps) {
  const duration = task.endTime == null ? 'in progress' : getDuration(task.startTime, task.endTime);
  const period = formatDate(new Date(task.startTime)) + ' - ' + (task.endTime == null ? 'in progress' : formatDate(new Date(task.endTime!)));

  return (
    <div className={cn('flex h-16 items-center border-t-2 border-gray-200 max-sm:h-32 max-sm:flex-col max-sm:px-3 sm:justify-between sm:p-6')}>
      <div className="flex flex-1 items-center max-sm:w-full">
        <span className="relative top-px max-sm:flex-1">{task.task}</span>
        <span>
          <CategoryTag taskCategory={task.categoryId} category={category} />
        </span>
      </div>
      <div className="flex items-center justify-center max-sm:w-full max-sm:justify-between max-sm:pt-2 max-sm:pb-4">
        <div className="mr-2 font-mono">{period}</div>
        <span className="mx-2 h-4 rounded-2xl border border-gray-200"></span>
        <div className="mx-2 font-mono">{duration}</div>
        <span className="mx-2 h-4 rounded-2xl border border-gray-200"></span>
        <div className="">
          <Ellipsis size={18} className="relative bottom-px" />
        </div>
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
