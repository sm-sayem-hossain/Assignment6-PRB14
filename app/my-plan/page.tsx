"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, CheckCircle2, ArrowRight, Flame, Clock, Dumbbell } from "lucide-react";
import toast from "react-hot-toast";
import { WorkoutType } from "../components/Workout";

export default function MyPlanPage() 
{
    const [planList, setPlanList] = useState<WorkoutType[]>([]);
    const [savedList, setSavedList] = useState<WorkoutType[]>([]);
    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
    const [sortBy, setSortBy] = useState<string>("default");
    const [completedIds, setCompletedIds] = useState<number[]>([]);

    const loadData = () =>
    {
        const plan = JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
        const saved = JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
        setPlanList(plan);
        setSavedList(saved);
    };
    useEffect(() => 
    {
        loadData();
        window.addEventListener("storage", loadData);
        return () => window.removeEventListener("storage", loadData);
    }, []);

    const handleRemove = (id: number, e: React.MouseEvent) =>
    {
        e.preventDefault();
        const key = activeTab === "plan" ? "fitlog_plan" : "fitlog_saved";
        const currentList = activeTab === "plan" ? planList : savedList;
        const updated = currentList.filter(item => item.id !== id);
        localStorage.setItem(key, JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
        loadData();
        toast.success("Removed successfully!");
    };

    const toggleComplete = (id: number, e: React.MouseEvent) => {
        e.preventDefault();
        setCompletedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const currentList = activeTab === "plan" ? planList : savedList;

    const totalExercises = currentList.length;
    const totalMinutes = currentList.reduce((acc, curr) => {
        const dur = typeof curr.duration === "number" ? curr.duration : parseInt(String(curr.duration)) || 0;
        return acc + dur;
    }, 0);
    const totalCalories = currentList.reduce((acc, curr) => {
        const cal = typeof curr.caloriesBurned === "number"
            ? curr.caloriesBurned
            : parseInt(String(curr.caloriesBurned || curr.calories || 0)) || 0;
        return acc + cal;
    }, 0);

    const sortedList = [...currentList].sort((a, b) => {
        if (sortBy === "duration") {
            const durA = typeof a.duration === "number" ? a.duration : parseInt(String(a.duration)) || 0;
            const durB = typeof b.duration === "number" ? b.duration : parseInt(String(b.duration)) || 0;
            return durB - durA;
        }
        if (sortBy === "calories") {
            const calA = typeof a.caloriesBurned === "number" ? a.caloriesBurned : parseInt(String(a.caloriesBurned || a.calories || 0)) || 0;
            const calB = typeof b.caloriesBurned === "number" ? b.caloriesBurned : parseInt(String(b.caloriesBurned || b.calories || 0)) || 0;
            return calB - calA;
        }
        if (sortBy === "rating") {
            return (b.rating ?? 0) - (a.rating ?? 0);
        }
        return 0;
    });

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="mb-8">
                <p className="text-[#ccff00] text-xs font-bold uppercase tracking-widest mb-1">
                    YOUR WORKOUT DASHBOARD
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                    MY PLAN
                </h1>
                <p className="text-gray-400 text-sm md:text-base mt-2">
                    Cap of five lifts for today. Stay consistent and crush your goals.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-[#12141a] border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1a2210] flex items-center justify-center text-[#ccff00]">
                        <Dumbbell className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Exercises</p>
                        <p className="text-2xl font-black text-white">{totalExercises}</p>
                    </div>
                </div>

                <div className="bg-[#12141a] border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1a2210] flex items-center justify-center text-[#ccff00]">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Minutes</p>
                        <p className="text-2xl font-black text-white">{totalMinutes} min</p>
                    </div>
                </div>

                <div className="bg-[#12141a] border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1a2210] flex items-center justify-center text-[#ccff00]">
                        <Flame className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Est. Calories</p>
                        <p className="text-2xl font-black text-white">{totalCalories} kcal</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2 bg-[#12141a] p-1 rounded-xl border border-gray-800">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            activeTab === "plan"
                                ? "bg-[#ccff00] text-black shadow-md"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Today&apos;s Plan ({planList.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            activeTab === "saved"
                                ? "bg-[#ccff00] text-black shadow-md"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Saved for Later ({savedList.length})
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 uppercase font-semibold">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-[#12141a] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ccff00]"
                    >
                        <option value="default">Default</option>
                        <option value="duration">Duration (High to Low)</option>
                        <option value="calories">Calories (High to Low)</option>
                        <option value="rating">Rating (High to Low)</option>
                    </select>
                </div>
            </div>

            {sortedList.length === 0 ? (
                <div className="text-center py-16 px-4 bg-[#12141a] border border-gray-800/80 rounded-3xl">
                    <p className="text-lg font-bold text-white mb-2">
                        {activeTab === "plan" ? "No workouts in today's plan yet." : "No saved workouts yet."}
                    </p>
                    <p className="text-gray-400 text-sm mb-6">
                        Explore our workouts and add your favorite ones to get started!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
                    >
                        Go to Workouts
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedList.map((item) => {
                        const isDone = completedIds.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                className={`bg-[#12141a] border ${
                                    isDone ? "border-[#ccff00]/40 bg-[#141b10]" : "border-gray-800"
                                } rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all`}
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-gray-800 shrink-0"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className={`text-base sm:text-lg font-black uppercase text-white ${
                                                isDone ? "line-through text-gray-400" : ""
                                            }`}>
                                                {item.name}
                                            </h3>
                                            {isDone && (
                                                <span className="text-xs bg-[#ccff00] text-black px-2 py-0.5 rounded-full font-bold">
                                                    DONE
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                            {item.description}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 mt-2">
                                            <span className="flex items-center gap-1 text-[#ccff00]">
                                                <Clock className="w-3.5 h-3.5" />
                                                {typeof item.duration === "number" ? `${item.duration}m` : (item.duration || "25m")}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 text-[#ccff00]">
                                                <Flame className="w-3.5 h-3.5" />
                                                {item.caloriesBurned ? `${item.caloriesBurned} kcal` : (item.calories || "180 kcal")}
                                            </span>
                                            <span>•</span>
                                            <span>{item.difficulty || "Intermediate"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                                    <button
                                        type="button"
                                        onClick={(e) => toggleComplete(item.id, e)}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                                            isDone
                                                ? "bg-[#ccff00] text-black"
                                                : "border border-gray-700 bg-black/40 text-gray-300 hover:text-white hover:border-gray-500"
                                        }`}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        {isDone ? "Completed" : "Mark as Done"}
                                    </button>

                                    <Link
                                        href={`/workout/${item.id}`}
                                        className="px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-gray-700 bg-black/40 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        Details
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={(e) => handleRemove(item.id, e)}
                                        className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                                        title="Remove workout"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}