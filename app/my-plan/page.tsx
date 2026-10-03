"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, CheckCircle2, Clock, Flame, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { WorkoutType } from "../components/Workout";

export default function MyPlanPage() 
{
    const [planList, setPlanList] = useState<WorkoutType[]>([]);
    const [savedList, setSavedList] = useState<WorkoutType[]>([]);
    const [activeTab, setActiveTab] = useState<"plan" | "saved">("saved");
    const [sortBy, setSortBy] = useState<string>("Duration");
    const [completedIds, setCompletedIds] = useState<(string | number)[]>([]);

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

    const handleRemove = (id: string | number, e: React.MouseEvent) => 
    {
        e.preventDefault();
        const key = activeTab === "plan" ? "fitlog_plan" : "fitlog_saved";
        const currentList = activeTab === "plan" ? planList : savedList;
        const updated = currentList.filter((item: WorkoutType) => item.id !== id);

        localStorage.setItem(key, JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
        loadData();
        toast.success("Removed from list");
    };

    const toggleComplete = (id: string | number, e: React.MouseEvent) => 
    {
        e.preventDefault();
        if (completedIds.includes(id)) 
        {
            setCompletedIds(completedIds.filter((item) => item !== id));
            toast("Marked as incomplete");
        } 
        else 
        {
            setCompletedIds([...completedIds, id]);
            toast.success("Marked as done!");
        }
    };

    const currentList = activeTab === "plan" ? planList : savedList;

    const totalExercises = currentList.length;

    const totalMinutes = currentList.reduce((sum: number, item: WorkoutType) => 
    {
        const dur = typeof item.duration === "number" ? item.duration : parseInt(String(item.duration)) || 0;
        return sum + dur;
    }, 0);

    const totalCalories = currentList.reduce((sum: number, item: WorkoutType) => 
    {
        const cal = typeof item.caloriesBurned === "number" 
            ? item.caloriesBurned 
            : parseInt(String(item.caloriesBurned || item.calories || 0)) || 0;
        return sum + cal;
    }, 0);

    const sortedList = [...currentList].sort((a: WorkoutType, b: WorkoutType) => 
    {
        if (sortBy === "Duration") 
        {
            const durA = typeof a.duration === "number" ? a.duration : parseInt(String(a.duration)) || 0;
            const durB = typeof b.duration === "number" ? b.duration : parseInt(String(b.duration)) || 0;
            return durB - durA;
        }
        if (sortBy === "Calories") 
        {
            const calA = typeof a.caloriesBurned === "number" ? a.caloriesBurned : parseInt(String(a.caloriesBurned || a.calories || 0)) || 0;
            const calB = typeof b.caloriesBurned === "number" ? b.caloriesBurned : parseInt(String(b.caloriesBurned || b.calories || 0)) || 0;
            return calB - calA;
        }
        if (sortBy === "Rating") 
        {
            return (b.rating ?? 0) - (a.rating ?? 0);
        }
        return 0;
    });

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 w-full">
            {/* Title Section matching Figma */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                    MY PLAN
                </h1>
                <p className="text-gray-400 text-sm md:text-base mt-2">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            {/* Metrics Summary Row - Single card with 3 columns matching Figma */}
            <div className="bg-[#101216] border border-gray-800/80 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-800/80 mb-8">
                <div className="pb-4 sm:pb-0 sm:pr-8">
                    <p className="text-sm text-gray-400 font-medium mb-1">Exercises</p>
                    <p className="text-4xl sm:text-5xl font-black text-[#ccff00]">{totalExercises}</p>
                </div>
                <div className="py-4 sm:py-0 sm:px-8">
                    <p className="text-sm text-gray-400 font-medium mb-1">Minutes</p>
                    <p className="text-4xl sm:text-5xl font-black text-white">{totalMinutes}</p>
                </div>
                <div className="pt-4 sm:pt-0 sm:pl-8">
                    <p className="text-sm text-gray-400 font-medium mb-1">Calories</p>
                    <p className="text-4xl sm:text-5xl font-black text-white">{totalCalories}</p>
                </div>
            </div>

            {/* Controls Bar: Tabs on Left, Sort by on Right matching Figma */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="inline-flex items-center bg-[#101216] p-1.5 rounded-xl border border-gray-800/80">
                    <button
                        type="button"
                        onClick={() => setActiveTab("plan")}
                        className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            activeTab === "plan"
                                ? "bg-[#1f242e] text-white shadow"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("saved")}
                        className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            activeTab === "saved"
                                ? "bg-[#1f242e] text-white shadow"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Saved
                    </button>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs text-gray-400 font-medium">Sort By</span>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-[#101216] border border-gray-800/80 rounded-xl pl-4 pr-9 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-gray-600 cursor-pointer"
                        >
                            <option value="Duration">Duration</option>
                            <option value="Calories">Calories</option>
                            <option value="Rating">Rating</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Empty State matching Figma screenshot (image copy 2.png) */}
            {sortedList.length === 0 ? (
                <div className="border border-dashed border-gray-800/90 rounded-3xl py-20 px-4 text-center">
                    <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider mb-2">
                        NOTHING HERE YET
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm mb-6 max-w-md mx-auto">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors shadow-lg cursor-pointer"
                    >
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedList.map((item: WorkoutType) => {
                        const isDone = completedIds.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                className={`bg-[#101216] border ${
                                    isDone ? "border-[#ccff00]/40 bg-[#141b10]" : "border-gray-800/80"
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
                                            {item.equipment || "Standard Equipment"}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 mt-2">
                                            <span className="flex items-center gap-1 text-gray-300">
                                                <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                                                {typeof item.duration === "number" ? `${item.duration} min` : (item.duration || "25 min")}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 text-gray-300">
                                                <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                                                {item.caloriesBurned ? `${item.caloriesBurned} kcal` : (item.calories || "180 kcal")}
                                            </span>
                                            <span>•</span>
                                            <span>⭐ {item.rating ?? 4.8}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
                                    <button
                                        type="button"
                                        onClick={(e) => toggleComplete(item.id, e)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                                            isDone
                                                ? "bg-[#ccff00] text-black"
                                                : "border border-gray-700 bg-transparent text-gray-300 hover:text-white hover:border-gray-500"
                                        }`}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        {isDone ? "Completed" : "Mark as Done"}
                                    </button>

                                    <Link
                                        href={`/workout/${item.id}`}
                                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-gray-700 bg-transparent text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
                                    >
                                        View Details
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