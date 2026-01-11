"use client";
import { useRef, useState, useEffect } from "react";

const HomePage = () => {
  const cardRef = useRef(null);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://6958d24e6c3282d9f1d5e2c7.mockapi.io/articles"
      );
      const result = await response.json();
      console.log("result:", result);

      if (Array.isArray(result)) {
        setUsers(result);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const getSafePosition = (rect: DOMRect) => {
    const popupWidth = 300;
    const margin = 12;

    let left = rect.right + 12;

    if (left + popupWidth > window.innerWidth) {
      left = rect.left - popupWidth - 12;
    }

    if (left < margin) left = margin;

    return {
      top: rect.top + window.scrollY,
      left,
    };
  };

  return (
    <div className="min-h-screen overflow-x-hidden flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md transform">
        {/* <h1 className="font-bold text-white">Ini HomePage</h1> */}
        <h1 className="text-white text-lg text-center font-bold">List User</h1>
        {users.map((user: any) => (
          <div
            key={user.id}
            role="button"
            onClick={(e) => {
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              const pos = getSafePosition(rect);

              setPosition(pos);
              setSelectedUser(user);
            }}
            className="text-slate-800 flex w-full items-center rounded-lg p-3 transition-all hover:bg-slate-100/20 focus:bg-slate-100 active:bg-slate-100/50"
          >
            <div className="mr-4 grid place-items-center">
              <img
                alt={user.name}
                src={user.avatar}
                className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
              />
            </div>
            <div>
              <div className="flex">
                <h6 className="text-slate-100 font-bold pr-1">
                  {user.first_name}
                </h6>
                <h6 className="text-slate-100 font-bold">{user.last_name}</h6>
              </div>
              <p className="text-slate-200 text-sm">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Floating */}
      {selectedUser && (
        <div className="w-full h-full fixed top-0 left-0 inset-0 bg-black/50 flex items-center justify-center">
          <div className="absolute bg-white rounded-2xl p-6 w-[300px] text-center shadow-xl">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <img
              src={selectedUser.avatar}
              alt={selectedUser.first_name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />

            <div className="text-start">
              <h2 className="font-bold text-lg">
                First Name: {selectedUser.first_name}
              </h2>

              <h2 className="font-bold text-lg">
                Last Name: {selectedUser.last_name}
              </h2>

              <p className="text-gray-600 text-sm mt-1">
                Followers: {selectedUser.followers}
              </p>

              <p className="text-gray-600 text-sm mt-1">
                Address: {selectedUser.address}
              </p>

              <p className="text-gray-600 text-sm mt-1">
                {" "}
                Email: {selectedUser.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
