"use client";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <section className="relative z-20 mx-auto -mt-8 max-w-4xl px-6">
      <div className="rounded-2xl border border-white/10 bg-[#121826] p-4 shadow-xl">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search markets... (Bitcoin, Elections, AI...)"
          className="w-full bg-transparent text-lg text-white outline-none placeholder:text-white"
        />
      </div>
    </section>
  );
}