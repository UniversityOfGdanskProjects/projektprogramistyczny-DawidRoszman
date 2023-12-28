import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the cinema</h1>
      <Link href="/explore">Explore</Link>
    </div>
  );
}
