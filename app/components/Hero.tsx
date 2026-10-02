import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-[#12141a] border border-gray-800/80 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1 space-y-6 flex flex-col items-center text-center md:items-start md:text-left">
                    <p className="text-[#ccff00] text-xs md:text-sm font-black tracking-widest uppercase">
                        WORKOUT LIBRARY
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                        TRAIN WITH INTENT. LOG EVERY SET.
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>
                    <Link href="#library"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#ccff00] text-black font-black text-sm tracking-wider uppercase hover:bg-[#b8e600] transition-transform active:scale-95 shadow-lg shadow-[#ccff00]/10">
                        BROWSE WORKOUTS
                    </Link>
                </div>
                <div className="flex-1 flex justify-center md:justify-end">
                    <div className="relative w-full max-w-[340px] md:max-w-[420px] aspect-square flex items-center justify-center">
                        <Image
                            src="/banner.png" alt="Workout Banner"
                            width={420} height={420} priority
                            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" />
                    </div>
                </div>
            </div>
        </section>
    )
}