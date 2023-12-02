import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid items-center">
      <div className="relative bg-cover bg-center h-screen flex items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight mb-4">
            Welcome to Our Cinema
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8">
            Discover the magic of movies in the comfort of our theaters.
          </p>
          <div className="flex justify-center">
            <Link
              href="/explore"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full uppercase tracking-wide transition duration-300"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
