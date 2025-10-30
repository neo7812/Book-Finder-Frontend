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
      <section className="hero min-h-[60vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-normal filter blur-3xl opacity-15 animate-pulse" style={{animationDelay: '1.5s'}}></div>
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay"
               style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'}}></div>
        </div>
        
        <div className="hero-content text-center px-4 relative z-10">
          <div className="max-w-4xl w-full">
            {/* SUPER LARGE TITLE */}
            <p className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-none"
               style={{
                 textShadow: '0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)',
                 background: 'linear-gradient(to right, #fff, #e9d5ff, #fff)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text'
               }}>
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