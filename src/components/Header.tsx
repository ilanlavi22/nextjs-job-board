import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1 className="text-4xl font-bold text-primary">Next Jobs</h1>
      <nav className="flex space-x-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/jobs/new">Post a job</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
