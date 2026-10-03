"use client";

import Image from "next/image"

export default function Footer() {
    return (
        <footer className="w-full bg-[#0b0c10] border-t border-gray-900 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="FitLog Logo" width={24} height={24} className="w-6 h-6 object-contain" />
                    <span className="font-black text-lg tracking-wider text-white">
                        FITLOG
                    </span>
                </div>
                <p className="text-xs text-gray-400 text-center sm:text-right">
                    © 2026 FitLog - Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    )
}