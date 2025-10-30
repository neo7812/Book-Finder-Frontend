import Image from "next/image";
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
  return (
    <Link href={`/book/${book.googleId}`} className="group">
      <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative">
        {book.savedAt && (
          <div className="absolute top-2 right-2 badge badge-success z-10">
            Saved
          </div>
        )}
        <figure className="h-64 relative overflow-hidden rounded-t-xl">
          {book.thumbnail ? (
            <Image
              src={book.thumbnail}
              alt={book.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg line-clamp-2 group-hover:text-primary transition-colors">
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
                  Star
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
  );
}