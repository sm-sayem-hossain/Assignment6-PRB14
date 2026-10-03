import Link from "next/link";
import { CalendarPlus, Bookmark } from "lucide-react";
import ActionButtons from "@/app/components/ActionButtons";

export default async function WorkoutDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, { cache: "no-store" });
    const workout = await res.json();

    const categories: string[] = Array.isArray(workout.muscleGroups)
        ? workout.muscleGroups
        : Array.isArray(workout.category)
            ? workout.category
            : typeof workout.category === "string"
                ? [workout.category]
                : [];

    const specs = [
        { label: "EQUIPMENT", value: workout.equipment || "N/A" },
        { label: "DIFFICULTY", value: workout.difficulty || "Intermediate" },
        { label: "SETS", value: workout.sets ?? 4 },
        { label: "REPS", value: workout.reps || "6-8" },
        { label: "DURATION", value: typeof workout.duration === "number" ? `${workout.duration} min` : (workout.duration || "25 min") },
        { label: "CALORIES", value: workout.caloriesBurned ? `${workout.caloriesBurned} kcal` : (workout.calories || "180 kcal") },
        { label: "RATING", value: workout.rating ?? 4.8 },
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
                <div className="w-full bg-[#12141a] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={workout.image}
                        alt={workout.name}
                        className="w-full h-auto aspect-square object-cover"
                    />
                </div>

                <div className="flex flex-col space-y-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
                            {workout.name}
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base mt-3 leading-relaxed">
                            {workout.description}
                        </p>

                        {categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {categories.map((cat, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-[#ccff00] text-black text-xs font-black uppercase px-3 py-1 rounded-full"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-[#12141a] border border-gray-800 rounded-2xl divide-y divide-gray-800/80">
                        {specs.map((spec, idx) => (
                            <div key={idx} className="flex items-center justify-between px-5 py-3.5 text-xs sm:text-sm">
                                <span className="text-gray-400 font-semibold tracking-wider uppercase">
                                    {spec.label}
                                </span>
                                <span className="text-white font-medium">
                                    {spec.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-widest mb-3">
                            INSTRUCTIONS
                        </h2>
                        {Array.isArray(workout.instructions) && workout.instructions.length > 0 ? (
                            <ol className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                                {workout.instructions.map((step: string, idx: number) => (
                                    <li key={idx} className="flex gap-2">
                                        <span className="text-[#ccff00] font-bold">{idx + 1}.</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="text-xs text-gray-400">No instructions available.</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <ActionButtons workout={workout} />
                    </div>
                </div>
            </div>
        </main>
    );
}