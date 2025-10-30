"use client";
import { useState } from "react";
import Link from "next/link";

type Book = {
  googleId: string;
  title: string;
  authors?: string[];
  thumbnail?: string;
  averageRating?: number;
  savedAt?: string;
};

export default function BookCard({ book }: { book: Book }) {
  const [isSaved, setIsSaved] = useState(!!book.savedAt);
  const [imgError, setImgError] = useState(false);

  const toggleFavorite = async () => {
    try {
      if (isSaved) {
        await fetch(`/api/favorites/${book.googleId}`, { method: "DELETE" });
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ googleId: book.googleId }),
        });
      }
      setIsSaved(!isSaved);
    } catch (err) {
      alert("Login required to save favorites");
    }
  };

  return (
    <div className="group relative">
      <Link href={`/book/${book.googleId}`}>
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          {book.savedAt && (
            <div className="absolute top-2 left-2 badge badge-success z-10">
              Saved
            </div>
          )}
          <figure className="h-64 relative overflow-hidden rounded-t-xl">
            {book.thumbnail && !imgError ? (
              <img
                src={book.thumbnail.replace("http://", "https://")} // Force HTTPS
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Cover</span>
              </div>
            )}
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg line-clamp-2 group-hover:text-primary">
              {book.title}
            </h2>
            {book.authors && (
              <p className="text-sm opacity-70 line-clamp-1">
                {book.authors.join(", ")}
              </p>
            )}
            {book.averageRating && (
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.round(book.averageRating!)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-1 text-xs opacity-70">
                  {book.averageRating}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* HEART BUTTON */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite();
        }}
        className={`absolute top-2 right-2 btn btn-circle btn-sm z-20 transition-colors ${
          isSaved ? "btn-error bg-red-500 hover:bg-red-600" : "btn-ghost hover:bg-gray-200"
        }`}
        title={isSaved ? "Remove from favorites" : "Add to favorites"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isSaved ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
}