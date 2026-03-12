'use client';
import { X } from 'lucide-react';
import ButtonWithIcon from './button-with-icon';
import Input from './input';
import Dropdown from './dropdown';
import { useRef } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function AddCategory({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const catColorRef = useRef<HTMLSpanElement>(null);
  const catRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const session = useSession();

  const handleClosePopUp = () => {
    setIsVisible(false);
  };

  const handleAddCategory = () => {
    axios.post(`${url}/api/category`, {
      category: catRef.current?.value,
      categoryColor: catColorRef.current?.textContent.trim(),
      userId: session.data?.user.id,
    });
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
              <Input className="flex-1 outline-0" placeholder="category name..." ref={catRef} maxLength={15} />
              <Dropdown ref={catColorRef} options={toOptions()} />
            </div>
            <div className="mt-10 flex justify-center gap-4">
              <ButtonWithIcon
                innerText="Add"
                onclick={handleAddCategory}
                className="bg-linear-to-b from-violet-500 via-violet-600 to-violet-500 px-6 text-white hover:via-violet-700"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function toOptions() {
  const catColor = [
    {
      id: 1,
      color: 'red',
    },
    {
      id: 2,
      color: 'green',
    },
    {
      id: 3,
      color: 'orange',
    },
    {
      id: 4,
      color: 'pink',
    },
  ];
  return catColor.map((c) => ({
    id: c.id,
    option: c.color,
  }));
}
