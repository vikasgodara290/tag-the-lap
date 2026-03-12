'use client';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import ProfileMenu from './profile-menu';

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const session = useSession();
  const handleProfileClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="">
      <div
        className="mr-6 flex h-13 items-center rounded-full border-2 border-gray-200 bg-gray-50 pr-4 hover:cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-gray-200">
          {session.data?.user?.image ? (
            <img src={session.data?.user?.image!} alt="profile" />
          ) : (
            <span className="font-white bg-blue-950">{session.data?.user?.name?.charAt(0)}</span>
          )}
        </div>
        <div className="ml-2">
          {session.data?.user?.name ? <span>{session.data?.user?.name}</span> : <span>{session.data?.user?.email?.split('@')[0]}</span>}
        </div>
      </div>
      <div className="">
        <ProfileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
