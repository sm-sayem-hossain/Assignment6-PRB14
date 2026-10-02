import Image from "next/image";
import Link from "next/link";
import {
    Clock, Flame, Star
} from "lucide-react";

export interface WorkoutType {
    id: string | number;
    name: string;
    category: string[];
    equipment: string;
    duration: string | number;
    calories: string | number;
    rating: number;
    image: string;
}


export default function WorkoutCard({ workout }: { workout: WorkoutType }) {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="bg-[#12141a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all group flex flex-col">
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Card Title
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
        </Link>

    );
}