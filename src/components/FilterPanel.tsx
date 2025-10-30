"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function FilterPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h3 className="text-lg font-bold mb-4">Filters</h3>

      <div className="space-y-6">
        <div>
          <label className="label font-medium">Author</label>
          <input
            type="text"
            placeholder="e.g. George R.R. Martin"
            className="input input-bordered w-full"
            defaultValue={searchParams.get("author") || ""}
            onBlur={(e) => updateParam("author", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category" className="label font-medium">Category</label>
          <select
            id="category"
            className="select select-bordered w-full"
            defaultValue={searchParams.get("category") || ""}
            onChange={(e) => updateParam("category", e.target.value)}
            aria-label="Category"
          >
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Biography">Biography</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
            <option value="Mystery">Mystery</option>
          </select>
        </div>
      </div>
    </div>
  );
}