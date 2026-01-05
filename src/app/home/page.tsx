"use client";
import { useRef, useState, useEffect } from "react";

const HomePage = () => {
  const cardRef = useRef(null);
  const [users, setUsers] = useState<any[]>([]);

  const getUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const result = await response.json();
      console.log("result:", result);

      if (Array.isArray(result.data)) {
        setUsers(result.data);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md transform">
        {/* <h1 className="font-bold text-white">Ini HomePage</h1> */}
        <h1 className="text-white text-lg text-center font-bold">List User</h1>
        {users.map((user: any) => (
          <div
            key={user.id}
            role="button"
            className="text-slate-800 flex w-full items-center rounded-lg p-3 transition-all hover:bg-slate-100/20 focus:bg-slate-100 active:bg-slate-100/50"
          >
            <div className="mr-4 grid place-items-center">
              <img
                alt={user.first_name}
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
    </div>
  );
};

export default HomePage;
