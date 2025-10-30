// src/app/book/[id]/page.tsx
import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let book: any = null;
  let error: string | null = null;

  try {
    // Correct path: /books/:id (baseURL already includes /api)
    const { data } = await api.get(`/books/${id}`);
    book = data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      notFound(); // Next.js 404 page
    }
    error = "Failed to load book. Please try again later.";
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="alert alert-error shadow-lg max-w-md mx-auto mb-6">
          <span>{error || "Book not found"}</span>
        </div>
        <Link href="/" className="btn btn-primary">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* COVER */}
        <div className="flex justify-center">
          {book.thumbnail ? (
            <img
              src={book.thumbnail.replace("http://", "https://")}
              alt={book.title}
              width={320}
              height={480}
              className="rounded-xl shadow-2xl object-cover w-full max-w-xs mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                // Show fallback div
              }}
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-80 h-96 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{book.title}</h1>
            <p className="text-xl opacity-80 mt-2">
              {book.authors?.join(", ") || "Unknown Author"}
            </p>
            {book.savedAt && (
              <div className="badge badge-success badge-lg mt-3">
                Saved on {new Date(book.savedAt).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <span>
              <strong>Publisher:</strong> {book.publisher || "N/A"}
            </span>
            <span>
              <strong>Published:</strong> {book.publishedDate || "N/A"}
            </span>
            <span>
              <strong>Pages:</strong> {book.pageCount || "N/A"}
            </span>
          </div>

          {/* RATING */}
          {book.averageRating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < Math.round(book.averageRating)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    Star
                  </span>
                ))}
              </div>
              <span className="text-lg font-medium">
                {book.averageRating} ({book.ratingsCount || 0} reviews)
              </span>
            </div>
          )}

          {/* CATEGORIES */}
          {book.categories && book.categories.length > 0 && (
            <div>
              <strong>Categories:</strong>{" "}
              <div className="flex flex-wrap gap-2 mt-2">
                {book.categories.map((cat: string) => (
                  <span key={cat} className="badge badge-ghost">
                    {cat.split(" / ").pop()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-2xl font-bold mb-3">Description</h2>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: book.description || "No description available.",
              }}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4">
            <a
              href={book.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              Preview on Google Books
            </a>
            <Link href="/" className="btn btn-ghost btn-lg">
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
