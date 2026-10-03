"use client";

import {CalendarPlus, Bookmark} from "lucide-react";
import toast from "react-hot-toast";
import { WorkoutType } from "./Workout";

export default function ActionButtons({workout}:{workout:WorkoutType})
{
    const handleAddToPlan=()=>
    {
        const stored=JSON.parse(localStorage.getItem("fitlog_plan") || "[]");
        const exists=stored.some((item:WorkoutType)=>item.id===workout.id);

        if(exists)
        {
            toast.error("Already added to Todays Plan");
            return;
        }

        const updated=[...stored,workout];
        localStorage.setItem("fitlog_plan",JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
        toast.success("Added to todays plan");
    };
    
    const handleSaveForLater = () =>
    {
        const stored =JSON.parse(localStorage.getItem("fitlog_saved") || "[]");
        const exists = stored.some((item: WorkoutType) => item.id === workout.id);

        if(exists)
        {
            toast.error("Already Saved for Later");
            return;
        }

        const updated = [...stored, workout];
        localStorage.setItem("fitlog_saved", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
        toast.success("Saved for later!");
    };
        return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
                type="button"
                onClick={handleAddToPlan}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#ccff00] text-black font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#b8e600] transition-colors cursor-pointer whitespace-nowrap">
                <CalendarPlus className="w-4 h-4 text-black" />
                Add to today&apos;s plan
            </button>
            <button
                type="button"
                onClick={handleSaveForLater}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-800 bg-[#12141a] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:border-gray-600 transition-colors cursor-pointer whitespace-nowrap">
                <Bookmark className="w-4 h-4 text-white" />
                Save for later
            </button>
        </div>
    );

}