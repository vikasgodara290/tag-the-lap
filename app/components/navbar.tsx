import Profile from './profile';

export default function Navbar() {
  return (
    <div className="flex h-24 w-screen items-center justify-between border-b-2 border-gray-200 max-sm:justify-end">
      <div className="h-full w-1/7 border-r-2 border-gray-200 bg-gray-50 max-sm:hidden"></div>
      <div className="">
        <Profile />
      </div>
    </div>
  );
}
