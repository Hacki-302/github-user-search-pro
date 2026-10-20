
import { useState } from "react";
import {
  CodeXml,
  Search,
  Users,
  GitFork,
  ExternalLink,
  LoaderCircle,
  AlertCircle,
  SearchX,
  ArrowRight,
  Sparkles,
  Code2,
} from "lucide-react";

const API_URL = "https://api.github.com";
const USERS_PER_PAGE = 12;

export default function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("best match");

  async function searchUsers(
    event,
    nextPage = 1,
    sortOption = sort,
    searchTerm = query
  ) {
    event?.preventDefault();

    const term = searchTerm.trim();

    if (!term) {
      setError("Please enter a GitHub username or search keyword.");
      setUsers([]);
      setTotalCount(0);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    setPage(nextPage);

    try {
      const params = new URLSearchParams({
        q: term,
        per_page: String(USERS_PER_PAGE),
        page: String(nextPage),
      });

      if (sortOption !== "best match") {
        params.set("sort", sortOption);
        params.set("order", "desc");
      }

      const response = await fetch(
        `${API_URL}/search/users?${params.toString()}`
      );

      if (response.status === 403) {
        throw new Error(
          "GitHub's search limit may have been reached. Wait a minute and try again."
        );
      }

      if (!response.ok) {
        throw new Error(`GitHub returned an error (${response.status}).`);
      }

      const data = await response.json();

      setUsers(data.items || []);
      setTotalCount(data.total_count || 0);

      if (!data.items?.length) {
        setError("No users found. Try another name or keyword.");
      }
    } catch (err) {
      setUsers([]);
      setTotalCount(0);

      setError(
        err instanceof TypeError
          ? "Unable to connect to GitHub. Check your internet connection."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSortChange(value) {
    setSort(value);

    if (query.trim() && searched) {
      searchUsers(null, 1, value);
    }
  }

  function handleQuickSearch(term) {
    setQuery(term);
    searchUsers(null, 1, sort, term);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#080b14] text-slate-100">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/[0.08] bg-[#080b14]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black shadow-lg shadow-white/10">
              <CodeXml size={25} />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                GitHub
                <span className="text-violet-400">Explorer</span>
              </p>
              <p className="text-xs text-slate-500">
                Developer discovery platform
              </p>
            </div>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/25 hover:bg-white/5"
          >
            <CodeXml size={17} />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        {/* Hero and search */}
        <section className="mx-auto max-w-4xl pb-14 pt-16 text-center sm:pt-24">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-4 py-2 text-sm text-violet-200">
            <Sparkles size={15} />
            Discover the people behind the code
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Find your next
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
              developer connection.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Explore GitHub profiles, discover developers, and find people
            building amazing things with code.
          </p>

          <form
            id="search-form"
            onSubmit={(event) => searchUsers(event, 1)}
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:flex-row"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <Search className="shrink-0 text-slate-500" size={21} />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search username, React, Python..."
                aria-label="Search GitHub users"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : (
                <Search size={18} />
              )}
              {loading ? "Searching..." : "Search users"}
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="mr-1 text-slate-500">Try searching:</span>

            {["torvalds", "React", "Python", "Ethiopia"].map((term) => (
              <button
                key={term}
                type="button"
                disabled={loading}
                onClick={() => handleQuickSearch(term)}
                className="rounded-full border border-white/10 px-3 py-1.5 text-slate-400 transition hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-violet-200"
              >
                {term}
              </button>
            ))}
          </div>
        </section>

        {/* Results heading and sorting */}
        <section className="border-t border-white/[0.08] pt-8">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Users className="text-violet-400" size={21} />

                <h2 className="text-xl font-bold">
                  {searched ? "Search results" : "Start exploring"}
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {searched
                  ? `${totalCount.toLocaleString()} matching users found`
                  : "Search GitHub to discover developer profiles"}
              </p>
            </div>

            <label className="flex items-center gap-3 text-sm text-slate-400">
              Sort by

              <select
                value={sort}
                onChange={(event) => handleSortChange(event.target.value)}
                className="rounded-xl border border-white/10 bg-[#111522] px-3 py-2.5 text-slate-200 outline-none focus:border-violet-400/60"
              >
                <option value="best match">Best match</option>
                <option value="followers">Followers</option>
                <option value="repositories">Repositories</option>
              </select>
            </label>
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/[0.06] p-4 text-rose-200"
            >
              <AlertCircle className="mt-0.5 shrink-0" size={20} />
              <p className="text-sm leading-6">{error}</p>
            </div>
          )}

          {/* Loading placeholders */}
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl border border-white/[0.07] bg-white/[0.03]"
                />
              ))}
            </div>
          )}

          {/* User cards */}
          {!loading && users.length > 0 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                  <article
                    key={user.id}
                    className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.045] hover:shadow-xl hover:shadow-violet-950/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                        loading="lazy"
                        className="h-16 w-16 rounded-2xl border border-white/10 bg-slate-800 object-cover"
                      />

                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400">
                        {user.type || "User"}
                      </span>
                    </div>

                    <h3 className="mt-5 truncate text-lg font-bold text-white">
                      {user.login}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      GitHub developer
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
                      <Code2 size={16} className="text-violet-400" />
                      <span>Public profile</span>
                    </div>

                    <div className="mt-5 border-t border-white/[0.08] pt-4">
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-violet-500 hover:text-white"
                      >
                        View GitHub profile

                        <ArrowRight
                          size={17}
                          className="transition group-hover:translate-x-1"
                        />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={page <= 1 || loading}
                  onClick={() => searchUsers(null, page - 1)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Previous
                </button>

                <span className="text-sm text-slate-500">
                  Page {page}
                </span>

                <button
                  type="button"
                  disabled={
                    page * USERS_PER_PAGE >= totalCount || loading
                  }
                  onClick={() => searchUsers(null, page + 1)}
                  className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Initial and empty states */}
          {!loading && users.length === 0 && !error && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                {searched ? (
                  <SearchX size={28} className="text-slate-500" />
                ) : (
                  <CodeXml size={30} className="text-violet-300" />
                )}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-200">
                {searched
                  ? "No results to display"
                  : "Your next discovery starts here"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {searched
                  ? "Try a different keyword or search for a programming language."
                  : "Search for a username, a developer, or a technology to find GitHub accounts."}
              </p>
            </div>
          )}
        </section>

        {/* Feature cards */}
        <section className="mt-16 grid gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Discover developers",
              description:
                "Search GitHub accounts by username or keyword.",
            },
            {
              icon: Users,
              title: "Explore profiles",
              description:
                "Open real developer profiles directly on GitHub.",
            },
            {
              icon: GitFork,
              title: "Built for developers",
              description:
                "A responsive interface powered by the GitHub API.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
            >
              <Icon className="text-violet-400" size={22} />

              <h3 className="mt-4 font-semibold text-slate-200">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.08] pt-6 text-center text-sm text-slate-500 sm:flex-row">
          <p>Built with React, Tailwind CSS, and the GitHub API.</p>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            Powered by GitHub
            <ExternalLink size={14} />
          </a>
        </footer>
      </main>
    </div>
  );
}
