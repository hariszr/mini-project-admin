"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const cardRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-api-key': '<project_api_key>',
          // 'x-reqres-env': 'prod'
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Register failed");
        console.error("API error", data)
        return;
      } 
      console.log("Register success =>", data);
      localStorage.setItem("token", data.token);
      router.push("/home");

    } catch (err: any) {
      console.error("Fetch error =>", err);
      setError("Network error");
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: -60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.inOut",
          clearProps: "all",
        }
      );

      gsap.fromTo(
        ".input-field",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.15,
          clearProps: "all",
        }
      );

      if (!buttonRef.current) return;

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.35,
          clearProps: "all",
        }
      );

      gsap.to(".fab", {
        y: -10,
        stagger: 0.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // const handleChange = (e: { target: { name: any; value: any; }; }) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", form);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div
        ref={cardRef}
        className=" bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-white mb-6 text-center animate-pulse">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Name */}
          {/* <div className="input-field relative">
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:bg-white/30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-200 transition"
            />
            <i className="fas fa-user absolute right-3 top-3 text-white"></i>
          </div> */}

          {/* Email */}
          <div className="input-field relative">
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:bg-white/30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-100 transition"
            />
            <i className="fas fa-envelope absolute right-3 top-3 text-white"></i>
          </div>

          {/* Password */}
          <div className="input-field relative">
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 focus:bg-white/30 focus:ring-2 focus:ring-purple-300 text-white placeholder-gray-100 transition"
            />
            <i className="fas fa-lock absolute right-3 top-3 text-white"></i>
          </div>

          {/* Button */}
          <button
            ref={buttonRef}
            type="submit"
            className="relative z-10 w-full
             bg-gradient-to-r from-purple-500 to-pink-600
             text-white font-bold py-3 px-4 rounded-lg
             hover:opacity-90 focus:ring-4 focus:ring-purple-300
             transition transform hover:scale-105"
          >
            Sign Up <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </form>

        <p className="text-white text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="font-bold hover:underline transition">
            Log in
          </Link>
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <a href="#" className="text-white hover:text-purple-300 transition">
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a href="#" className="text-white hover:text-purple-300 transition">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-white hover:text-purple-300 transition">
            <i className="fab fa-google text-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
