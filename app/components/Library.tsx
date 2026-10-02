"use client";

import { useState, useEffect } from "react";
import WorkoutCard, { WorkoutType } from "./Workout";
import { ArrowUpDown } from "lucide-react";

export default function Library() {
    const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("duration");

    useEffect(() => {
        fetch("https://api.abcz.workers.dev/api/fitlog")
            .then((res) => res.json())
            .then((data) => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch Workouts:", err);
                setLoading(false);
            });
    }, []);

    return (
        <section id="library" className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">THE LIBRARY</h2>
                    <p className="text-gray-400 text-sm mt-1">Twelve lifts covering every major muscle group.</p>
                </div>
            </div>
            <p className="text-white text-center py-10">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <span className="loading loading-bars loading-lg text-[#ccff00]"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {workouts.map((workout) => (
                            <WorkoutCard key={workout.id} workout={workout} />
                        ))}
                    </div>
                )}
            </p>
        </section>
    );
}