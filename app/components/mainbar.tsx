import { Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from 'react';
import ButtonWithIcon from './button-with-icon';
import Stopwatch from './stopwatch';
import Input from './input';
import Dropdown from './dropdown';
import EditIcon from './edit-task';
import axios from 'axios';
import { Ban, LucideProps, NotebookPen, Play } from 'lucide-react';
import { CategoryType, TaskType } from '../lib/types';
import { useSession } from 'next-auth/react';

interface MainbarProps {
  setNotification: Dispatch<SetStateAction<string>>;
  task: TaskType | undefined;
  setIsTaskModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
  category: CategoryType[];
  setIsAddCatModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainBar({ setNotification, task, setIsTaskModalVisible, setCurrentTask, category, setIsAddCatModalVisible }: MainbarProps) {
  const [isStarted, setIsStarted] = useState<boolean>(!!task);
  const [userId, setUserId] = useState<string | undefined>();
  const [taskInputVal, setTaskInputVal] = useState(task ? (task.task == 'To Be Defined' ? undefined : task.task) : undefined);
  const [isTaskInputDisabled, setIsTaskInputDisabled] = useState(task ? (task.task == 'To Be Defined' ? false : true) : false);
  const [isCatDropDownDisabled, setIsCatDropDownDisabled] = useState(task ? !(task.categoryId === null) : false);
  const categoryRef = useRef<HTMLSpanElement>(null);
  const taskRef = useRef<HTMLTextAreaElement>(null);
  const btnRef = useRef<HTMLSpanElement>(null);
  const session = useSession();
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  console.log('from mainbar task: ', task);

  useEffect(() => {
    if (session.status == 'authenticated') {
      setUserId(session.data?.user.id);
    }
  }, [session]);

  useEffect(() => {
    setTaskInputVal(task ? (task.task == 'To Be Defined' ? undefined : task.task) : undefined);
    setIsCatDropDownDisabled(task ? !(task.categoryId === null) : false);
    setIsTaskInputDisabled(task ? (task.task == 'To Be Defined' ? false : true) : false);
  }, [task]);

  const handleStart = async () => {
    const taskInput = taskRef.current?.value;
    const categoryId = parseInt(categoryRef.current?.id.trim()!);
    const startTime = new Date().toISOString();
    const btnText = btnRef.current?.textContent.trim();
    if (!taskInput || taskInput === '') {
      setNotification('Please enter task first!');
      return;
    }

    if (!categoryId || categoryId === 0) {
      setNotification('Please select category first!');
      return;
    }

    if (btnText == 'Start') {
      const endTime = null;
      axios.post(`${url}/api/task`, {
        task: taskInput,
        categoryId,
        startTime,
        endTime,
        userId,
      });
      setIsStarted((prev) => !prev);
    } else if (btnText == 'Stop') {
      const endTime = new Date().toISOString();
      const mode = 'continuous';

      if (mode == 'continuous') {
        setIsTaskModalVisible(true);
      } else {
        axios.put(`${url}/api/task`, {
          id: task?.id,
          endTime,
        });
        setIsStarted((prev) => !prev);
      }
    } else if (btnText == 'Log the pending task') {
      const res = await axios.put(`${url}/api/task`, {
        id: task?.id,
        task: taskInput,
        categoryId,
      });

      setCurrentTask(res.data);
    }
  };

  let icon: ReactElement<LucideProps>;
  let startBtnText: string = 'Start';
  if (!isStarted) {
    icon = <Play />;
  } else {
    icon = <Ban />;
    startBtnText = ' Stop';
  }

  if (task ? task.task == 'To Be Defined' : false) {
    startBtnText = 'Log the pending task';
    icon = <NotebookPen />;
  }

  return (
    <div className="mx-auto mb-5 flex items-center justify-between gap-3 rounded-md border-2 border-gray-200 p-6 max-sm:flex-col">
      <Input
        className="flex-1 outline-0"
        placeholder="What are you working on..."
        ref={taskRef}
        value={task?.task}
        isTaskInputDisabled={isTaskInputDisabled}
      />

      <span className="flex items-center gap-3 max-sm:w-full max-sm:flex-col">
        <Dropdown
          ref={categoryRef}
          options={toOptions(category)}
          currSelectedOptionId={task ? (task.categoryId == null ? undefined : task.categoryId) : undefined}
          isDisabled={isCatDropDownDisabled}
          className="text-gray-700"
          setIsAddCatModalVisible={setIsAddCatModalVisible}
          addMoreOption={true}
        />

        <span className="mx-2 rounded-2xl border border-gray-200 max-sm:w-1/9 sm:h-4"></span>

        <Stopwatch isStarted={isStarted} currentSeconds={task ? Math.floor((Date.now() - new Date(task.startTime).getTime()) / 1000) : 0} />

        <span className="mx-2 rounded-2xl border border-gray-200 max-sm:w-1/9 sm:h-4"></span>

        <div className="flex shrink-0 items-center gap-3">
          <ButtonWithIcon
            innerText={startBtnText}
            isRoundCorner={true}
            buttonSize="mid"
            onclick={handleStart}
            icon={icon}
            ref={btnRef}
            className="bg-linear-to-b from-violet-500 via-violet-600 to-violet-500 px-6 text-white hover:via-violet-700"
          />

          <span className="mx-2 rounded-2xl border border-gray-200 max-sm:hidden max-sm:w-1/9 sm:h-4"></span>

          <EditIcon
            setCurrentTask={setCurrentTask}
            setIsCatDropDownDisabled={setIsCatDropDownDisabled}
            setTaskInputVal={setTaskInputVal}
            catRef={categoryRef}
            taskRef={taskRef}
            currTask={task}
            setNotification={setNotification}
            setIsTaskInputDisabled={setIsTaskInputDisabled}
          />
        </div>
      </span>
    </div>
  );
}

function toOptions(categories: CategoryType[]) {
  return categories.map((c) => ({
    id: c.id,
    option: c.category,
  }));
}
