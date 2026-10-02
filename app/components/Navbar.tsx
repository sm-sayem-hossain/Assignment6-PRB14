"use client";

import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-[#0b0c10]/95 backdrop-blur border-b border-gray-800">
            <div className="navbar max-w-7xl mx-auto px-4">

                <div className="navbar-start gap-2">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#12141a] border border-gray-800 rounded-box z-50 mt-3 w-48 p-2 shadow-2xl space-y-1">
                            <li>
                                <Link href="/" className={pathname === "/" ? "bg-[#16200a] text-[#ccff00] font-bold" : "text-gray-300"}>
                                    Workouts
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-plan" className={pathname === "/my-plan" ? "bg-[#16200a] text-[#ccff00] font-bold" : "text-gray-300"}>
                                    My Plan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="FitLog Logo" width={28} height={28} className="w-7 h-7 object-contain" />
                        <span className="font-black text-xl tracking-wider text-white">
                            FITLOG
                        </span>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pathname === "/"
                                    ? "bg-[#16200a] text-[#ccff00]"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Workouts
                        </Link>
                        <Link
                            href="/my-plan"
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pathname === "/my-plan"
                                    ? "bg-[#16200a] text-[#ccff00]"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            My Plan
                        </Link>
                    </div>
                </div>


                <div className="navbar-end gap-3">
                    <Link href="/my-plan" className="flex items-center gap-2 text-sm text-white">
                        <span>Plan</span>
                        <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black text-xs font-bold flex items-center justify-center">0</span>
                    </Link>
                    <Link href="/my-plan" className="flex items-center gap-2 text-sm text-gray-300">
                        <span>Saved</span>
                        <span className="w-5 h-5 rounded-full border border-gray-700 text-gray-300 text-xs flex items-center justify-center">0</span>
                    </Link>
                </div>

            </div>
        </nav>
    );

} 