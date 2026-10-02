"use client";

import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex item-center gap-2">
                    <Image src="/logo.png" alt="~" width={32} height={32} />
                    <span className="font-black text-xl tracking-wider text-white">
                        FITLOG
                    </span>
                </Link>

                <div className="flex items-center gap-6">
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

                <div className="flex items-center gap-4">
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
    )
} 