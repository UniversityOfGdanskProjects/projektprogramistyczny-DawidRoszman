import Link from "next/link";

export default function Home() {
  return (
    <main className="grid items-center">
      <div className="relative flex items-center h-screen bg-center bg-cover">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative z-10 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl lg:text-8xl">
            Welcome to Our Cinema
          </h1>
          <p className="mb-9 text-lg md:text-xl lg:text-2xl">
            Discover the magic of movies in the comfort of our theaters.
          </p>
          <div className="flex justify-center">
            <Link
              href="/explore"
              className="px-4 py-2 font-bold tracking-wide text-white uppercase transition duration-300 bg-red-600 rounded-full hover:bg-red-700"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
