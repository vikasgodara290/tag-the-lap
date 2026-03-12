'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Input from './input';
import Dropdown from './dropdown';
import ButtonWithIcon from './button-with-icon';
import { X } from 'lucide-react';
import axios from 'axios';
import { CategoryType, TaskType } from '../lib/types';
import { useSession } from 'next-auth/react';

interface TaskPopupProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentTask: TaskType | undefined;
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskType | undefined>>;
  category: CategoryType[];
  setIsAddCatModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isAddCatModalVisible: boolean;
}

export default function TaskPopup({
  isVisible,
  setIsVisible,
  currentTask,
  setCurrentTask,
  category,
  setIsAddCatModalVisible,
  isAddCatModalVisible,
}: TaskPopupProps) {
  const categoryRef = useRef<HTMLSpanElement>(null);
  const taskRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | undefined>();
  const session = useSession();
  const url = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    isAddCatModalVisible && setIsVisible(false);
  }, [isAddCatModalVisible]);

  useEffect(() => {
    taskRef.current?.focus();

    function handlePointerDown(e: MouseEvent) {
      if (!isVisible) return;
      if (!modalRef.current) return;

      if (!modalRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    }

    if (session.status == 'authenticated') {
      setUserId(session.data?.user.id);
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isVisible]);

  const handleBtnTransfer = async () => {
    const taskInput = taskRef.current?.value;
    const categoryId = parseInt(categoryRef.current?.id.trim()!);

    const endTime = new Date().toISOString();
    await axios.put(`${url}/api/task`, {
      id: currentTask?.id,
      endTime,
    });

    const res = await axios.post(`${url}/api/task`, {
      task: taskInput,
      categoryId,
      startTime: endTime,
      endTime: null,
      userId,
    });

    setCurrentTask(res.data);
    setIsVisible(false);
  };

  const handleBtnLogLater = async () => {
    const endTime = new Date().toISOString();
    axios.put(`${url}/api/task`, {
      id: currentTask?.id,
      endTime: endTime,
    });

    const res = await axios.post(`${url}/api/task`, {
      task: 'To Be Defined',
      categoryId: null,
      startTime: endTime,
      endTime: null,
      userId,
    });

    setCurrentTask(res.data);
    setIsVisible(false);
  };

  const handleClosePopUp = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="absolute top-0 right-0 bottom-0 left-0 z-50 h-screen w-screen bg-gray-600/50">
          <div
            ref={modalRef}
            className="absolute top-1/6 left-1/2 w-5/12 -translate-x-1/2 transform rounded-md border-2 border-gray-200 bg-white p-5 max-sm:w-11/12"
          >
            <div className="mb-4 flex justify-end">
              <X onClick={handleClosePopUp} className="hover:cursor-pointer" />
            </div>
            <div className="flex justify-between gap-2 max-sm:flex-col sm:items-center">
              <Input className="flex-1 outline-0" placeholder="What are you working on..." ref={taskRef} />
              <Dropdown ref={categoryRef} options={toOptions(category)} setIsAddCatModalVisible={setIsAddCatModalVisible} addMoreOption={true} />
            </div>
            <div className="mt-10 flex justify-center gap-4">
              <ButtonWithIcon
                innerText="Start"
                onclick={handleBtnTransfer}
                className="bg-linear-to-b from-violet-500 via-violet-600 to-violet-500 px-6 text-white hover:via-violet-700"
              />
              <ButtonWithIcon
                innerText="Log Later"
                onclick={handleBtnLogLater}
                className="border border-violet-500 bg-white px-6 text-violet-600 transition-all duration-200 hover:border-violet-600 hover:bg-violet-50"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function toOptions(categories: CategoryType[]) {
  return categories.map((c) => ({
    id: c.id,
    option: c.category,
  }));
}
