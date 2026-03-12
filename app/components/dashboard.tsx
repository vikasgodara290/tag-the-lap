'use client';

import MainBar from './mainbar';
import TaskList from './task-list';
import Notification from './notification';
import { useMemo, useState } from 'react';
import TaskPopup from './task-popup';
import { CategoryType, TaskType } from '../lib/types';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { SessionProvider } from 'next-auth/react';
import AddCategory from './add-category';

interface PopupSectionProps {
  tasks: TaskType[];
  category: CategoryType[];
  noOfDays: number;
}

export default function PopupSection({ tasks, category, noOfDays }: PopupSectionProps) {
  const [notification, setNotification] = useState('');
  const [currentTask, setCurrentTask] = useState(tasks.find((value) => value.endTime == null));
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isAddCatModalVisible, setIsAddCatModalVisible] = useState(false);

  const taskObj = useMemo(() => getDateWiseTasks(noOfDays, tasks), [tasks, noOfDays]);

  return (
    <SessionProvider>
      <div className="flex h-screen flex-col">
        {/* Navbar */}
        <div className="h-24">
          <Navbar />
        </div>

        {/* Sidebar + Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="z-50 w-1/7 overflow-y-auto border-r-2 border-gray-200 bg-gray-50 max-sm:hidden">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto max-sm:p-4 sm:p-6">
            <TaskPopup
              currentTask={currentTask}
              setCurrentTask={setCurrentTask}
              isVisible={isTaskModalVisible}
              setIsVisible={setIsTaskModalVisible}
              category={category}
              setIsAddCatModalVisible={setIsAddCatModalVisible}
              isAddCatModalVisible={isAddCatModalVisible}
            />

            <AddCategory isVisible={isAddCatModalVisible} setIsVisible={setIsAddCatModalVisible} />

            <Notification notification={notification} setNotification={setNotification} />

            <MainBar
              task={currentTask}
              setCurrentTask={setCurrentTask}
              setNotification={setNotification}
              setIsTaskModalVisible={setIsTaskModalVisible}
              category={category}
              setIsAddCatModalVisible={setIsAddCatModalVisible}
            />

            {getArrayOfDates(noOfDays).map(
              (day) =>
                taskObj[day.toLocaleDateString()]?.length > 0 && (
                  <TaskList
                    key={day.toLocaleDateString()}
                    taskList={taskObj[day.toLocaleDateString()]}
                    category={category}
                    day={day.toDateString()}
                  />
                ),
            )}
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}

function getObjOfDates(noOfDays: number) {
  let arrOfDays: Record<string, TaskType[]> = {};
  for (let i = 0; i < noOfDays; i++) {
    const day = new Date(new Date().setDate(new Date().getDate() - i));
    arrOfDays[day.toLocaleDateString()] = [];
  }
  return arrOfDays;
}

function getArrayOfDates(noOfDays: number) {
  let arrOfDays: Date[] = [];
  const today = new Date();
  for (let i = 0; i < noOfDays; i++) {
    const day = new Date(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i).setHours(0, 0, 0, 0));
    arrOfDays.push(day);
  }
  return arrOfDays;
}

function getDateWiseTasks(noOfDays: number, tasks: TaskType[]) {
  const taskObj = getObjOfDates(noOfDays);
  const dateArr = getArrayOfDates(noOfDays);

  for (let i = 0; i < dateArr.length; i++) {
    let yesterday = new Date(new Date(new Date(dateArr[i].getFullYear(), dateArr[i].getMonth(), dateArr[i].getDate() + 1)).setHours(0, 0, 0, 0));
    taskObj[dateArr[i].toLocaleDateString()] = tasks.filter((task) => {
      return yesterday >= new Date(task.startTime) && new Date(task.startTime) >= dateArr[i] && task.endTime != null;
    });
  }

  return taskObj;
}
