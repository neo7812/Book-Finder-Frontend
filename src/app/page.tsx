// src/app/page.tsx
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import BookCard from "@/components/BookCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { api } from "@/lib/api";
import { Suspense } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";

async function fetchBooks({
  q,
  page = 1,
  author,
  category,
}: {
  q: string;
  page?: number;
  author?: string;
  category?: string;
}) {
  "use server";
  if (!q?.trim()) return { books: [], total: 0, error: null };

  try {
    const res = await api.get("/books/search", {
      params: { q: q.trim(), page, author, category },
    });
    return {
      books: res.data.books || [],
      total: res.data.totalItems || 0,
      error: null,
    };
  } catch (err: any) {
    return {
      books: [],
      total: 0,
      error: err.response?.data?.message || "Failed to load books",
    };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    author?: string;
    category?: string;
  }>;
}) {
  const { q = "", author = "", category = "" } = await searchParams;
  const trimmedQ = q.trim();

  return (
    <>
      {/* HERO */}
      <section className="hero min-h-[60vh] bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="hero-content text-center px-4">
          <div className="max-w-4xl w-full">
            {/* SUPER LARGE TITLE */}
            <p className="text-3xl sm:text-3xl md:text-3xl font-black text-amber-50 mb-10 drop-shadow-2xl tracking-tighter leading-none">
              BOOK FINDER
            </p>
            
            {/* SEARCH BAR */}
            <div className="max-w-3xl mx-auto mt-5">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64">
            <FilterPanel />
          </aside>

          <section className="flex-1">
            {!trimmedQ ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">
                  Start typing to discover books...
                </p>
              </div>
            ) : (
                <InfiniteScroll
                  initialQuery={trimmedQ}
                  initialAuthor={author}
                  initialCategory={category}
                />
            )}
          </section>
        </div>
      </div>
    </>
  );
}