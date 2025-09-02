"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { signOut, getAuth, User } from "firebase/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight hover:opacity-90 transition-opacity">
            Project Collaboration
          </h1>
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Link href="/profile" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {(user.displayName || user.email || "U")[0].toUpperCase()}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
                {user.displayName || user.email || "User"}
              </span>
            </Link>
          ) : (
            <Link href="/login">
              <button className="px-5 py-2 rounded-full bg-black text-white font-medium text-sm hover:bg-gray-800 transition shadow-md hover:shadow-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
