import Image from "next/image";
import Link from "next/link";
import {
    Clock, Flame, Star
} from "lucide-react";

export interface WorkoutType {
    id: string | number;
    name: string;
    description?: string;
    difficulty?: string;
    muscleGroups?: string[];
    category?: string[];
    equipment?: string;
    duration: string | number;
    caloriesBurned?: string | number;
    calories?: string | number;
    rating: number;
    image: string;
}

export default function WorkoutCard({ workout }: { workout: WorkoutType }) {
    const rawCategories = Array.isArray(workout.muscleGroups) 
        ? workout.muscleGroups 
        : Array.isArray(workout.category) 
            ? workout.category 
            : typeof workout.category === 'string' 
                ? [workout.category] 
                : [];

    return (
        <Link
            href={`/workout/${workout.id}`}
            className="bg-[#12141a] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-gray-600 transition-all group flex flex-col"
        >
            <figure className="relative h-52 w-full bg-[#181a20] overflow-hidden">
                <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </figure>
            
            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                    {rawCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {rawCategories.map((cat, idx) => (
                                <span key={idx} className="bg-[#ccff00] text-black text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">
                        {workout.name}
                    </h3>
                    
                    <p className="text-xs text-gray-400">
                        {workout.equipment}
                    </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{typeof workout.duration === 'number' ? `${workout.duration} min` : workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.caloriesBurned ? `${workout.caloriesBurned} kcal` : workout.calories}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-gray-400" />
                        <span>{workout.rating}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}