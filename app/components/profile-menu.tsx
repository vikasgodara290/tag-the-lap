import { signOut } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface ProfileMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileMenu({ isOpen, setIsOpen }: ProfileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    isOpen && menuRef.current?.focus();
  }, [isOpen]);

  const handleOnBlur = () => {
    setIsOpen(false);
  };
  return (
    <>
      {isOpen && (
        <div
          tabIndex={0}
          className="absolute w-32 rounded-sm border-2 border-gray-200 bg-white outline-0 max-sm:w-20"
          onBlur={handleOnBlur}
          ref={menuRef}
        >
          <span className="hover:cursor-pointer" onClick={() => signOut()}>
            Log Out
          </span>
        </div>
      )}
    </>
  );
}
