'use client';
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface OptionType {
  id: number;
  option: string;
}

interface DropdownProps {
  ref: React.Ref<HTMLSpanElement>;
  options: OptionType[];
  currSelectedOptionId?: number | undefined;
  isDisabled?: boolean;
  className?: string;
  setIsAddCatModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  addMoreOption?: boolean;
}

export default function Dropdown({
  ref,
  options,
  currSelectedOptionId,
  isDisabled = false,
  className,
  setIsAddCatModalVisible,
  addMoreOption = false,
}: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(currSelectedOptionId ? currSelectedOptionId : 0);

  useEffect(() => {
    if (currSelectedOptionId) {
      setSelectedOptionId(currSelectedOptionId);
    }
  }, [currSelectedOptionId]);

  const handleClick = () => {
    if (isDisabled) return;
    setIsDropdownOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setIsDropdownOpen(false);
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    const selectedOption = e.currentTarget.id.trim();
    setIsDropdownOpen(false);
    setSelectedOptionId(parseInt(selectedOption));
  };

  const handleAddCategory = () => {
    setIsAddCatModalVisible && setIsAddCatModalVisible(true);
    setIsDropdownOpen(false);
  };

  return (
    <div tabIndex={0} className={`${className} relative max-sm:w-full`} onBlur={handleBlur}>
      <div
        className={`flex w-36 items-center justify-between rounded-md border-2 border-gray-200 p-2 text-center hover:cursor-pointer max-sm:w-full`}
        onClick={handleClick}
      >
        <span ref={ref} id={selectedOptionId.toString()}>
          {selectedOptionId === 0 ? 'Select' : options.find((option) => option.id === selectedOptionId)?.option}
        </span>
        {!isDropdownOpen ? <ChevronsUpDown size={18} /> : <ChevronsDownUp size={18} />}
      </div>
      {isDropdownOpen && (
        <div className="absolute z-50 mt-1 w-36 rounded-md border-2 border-gray-200 bg-white text-center hover:cursor-pointer max-sm:w-full">
          {options.map((value) => {
            return (
              <div
                id={value.id.toString()}
                key={value.id}
                className="rounded-md p-2 hover:bg-gray-100 hover:text-black"
                onClick={(e) => handleSelectClick(e)}
              >
                {value.option}
              </div>
            );
          })}
          {addMoreOption && (
            <div key={1212} className="rounded-md p-2 hover:bg-gray-100 hover:text-black" onClick={handleAddCategory}>
              + Add Category
            </div>
          )}
        </div>
      )}
    </div>
  );
}
