"use client";
import { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { api } from "@/lib/api";

type Props = {
  initialQuery: string;
  initialAuthor?: string;
  initialCategory?: string;
};

export default function InfiniteScroll({
  initialQuery,
  initialAuthor = "",
  initialCategory = "",
}: Props) {
  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookRef = useRef<HTMLDivElement>(null);

  // Reset when query/filters change
  useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [initialQuery, initialAuthor, initialCategory]);

  const loadMore = async (pageNum: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/books/search", {
        params: {
          q: initialQuery,
          page: pageNum,
          author: initialAuthor,
          category: initialCategory,
        },
      });

      const newBooks = res.data.books || [];
      const total = res.data.totalItems || 0;

      // Deduplicate just in case
      setBooks((prev) => {
        const seen = new Set(prev.map((b) => b.googleId));
        const filtered = newBooks.filter((b: any) => !seen.has(b.googleId));
        return [...prev, ...filtered];
      });

      setHasMore(books.length + newBooks.length < total);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load more books");
    } finally {
      setLoading(false);
    }
  };

  // Load first page
  useEffect(() => {
    loadMore(1).then(() => setPage(2));
  }, [initialQuery, initialAuthor, initialCategory]);

  // Intersection observer
  useEffect(() => {
    if (loading || !hasMore) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore(page);
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.3, rootMargin: "200px" }
    );

    if (lastBookRef.current) observer.current.observe(lastBookRef.current);

    return () => observer.current?.disconnect();
  }, [loading, hasMore, page]);

  return (
    <>
      {error && (
        <div className="alert alert-error shadow-lg mb-6">
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={`${book.googleId}-${index}`} // UNIQUE KEY
            ref={index === books.length - 1 ? lastBookRef : null}
          >
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {loading && <LoadingSkeleton count={4} />}

      {!hasMore && books.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>You've reached the end!</p>
        </div>
      )}
    </>
  );
}