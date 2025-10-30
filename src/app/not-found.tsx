import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Oops! Book not found.</p>
      <Link href="/" className="btn btn-primary mt-6">
        Back to Search
      </Link>
    </div>
  );
}