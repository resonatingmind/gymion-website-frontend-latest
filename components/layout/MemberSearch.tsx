"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Mock member data (replace with real API call later) ─────────────────────
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: "active" | "expiring" | "expired";
}

const MOCK_MEMBERS: Member[] = [
  { id: "MEM001", name: "Rahul Kumar",    email: "rahul.kumar@email.com",    phone: "9876543210", plan: "Monthly · Standard",    status: "active"   },
  { id: "MEM002", name: "Priya Sharma",   email: "priya.sharma@email.com",   phone: "9812345678", plan: "Quarterly · Premium",   status: "active"   },
  { id: "MEM003", name: "Arjun Mehta",    email: "arjun.mehta@email.com",    phone: "9823456789", plan: "Monthly · Standard",    status: "expiring" },
  { id: "MEM004", name: "Sneha Joshi",    email: "sneha.joshi@email.com",    phone: "9834567890", plan: "Annual · Premium",      status: "active"   },
  { id: "MEM005", name: "Vikram Desai",   email: "vikram.desai@email.com",   phone: "9845678901", plan: "Monthly · Standard",    status: "expired"  },
  { id: "MEM006", name: "Ananya Iyer",    email: "ananya.iyer@email.com",    phone: "9856789012", plan: "Quarterly · Standard",  status: "active"   },
  { id: "MEM007", name: "Rohan Nair",     email: "rohan.nair@email.com",     phone: "9867890123", plan: "Monthly · Premium",     status: "active"   },
  { id: "MEM008", name: "Kavya Reddy",    email: "kavya.reddy@email.com",    phone: "9878901234", plan: "Annual · Standard",     status: "expiring" },
  { id: "MEM009", name: "Siddharth Rao",  email: "siddharth.rao@email.com",  phone: "9889012345", plan: "Monthly · Standard",    status: "active"   },
  { id: "MEM010", name: "Deepika Menon",  email: "deepika.menon@email.com",  phone: "9890123456", plan: "Quarterly · Premium",   status: "active"   },
];

// ── Helper ───────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}

function getStatusStyle(status: Member["status"]) {
  switch (status) {
    case "active":   return "bg-emerald-100 text-emerald-700";
    case "expiring": return "bg-amber-100 text-amber-700";
    case "expired":  return "bg-red-100 text-red-600";
  }
}

function searchMembers(query: string): Member[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return MOCK_MEMBERS.filter((m) =>
    m.name.toLowerCase().includes(q) ||
    m.email.toLowerCase().includes(q) ||
    m.phone.includes(q) ||
    m.id.toLowerCase().includes(q)
  ).slice(0, 6); // cap at 6 results
}

// ── Sub-component: Dropdown list ─────────────────────────────────────────────
function MemberDropdown({
  results,
  query,
  onSelect,
}: {
  results: Member[];
  query: string;
  onSelect: (member: Member) => void;
}) {
  if (!query.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/60 overflow-hidden z-50">
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <Search size={20} className="mb-2 opacity-40" />
          <p className="text-sm">No members found for &ldquo;{query}&rdquo;</p>
        </div>
      ) : (
        <ul>
          {results.map((member, idx) => (
            <li key={member.id}>
              <button
                onMouseDown={(e) => { e.preventDefault(); onSelect(member); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 hover:bg-violet-50 transition-colors text-left",
                  idx !== results.length - 1 && "border-b border-gray-50"
                )}
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 text-sm font-bold">
                  {getInitials(member.name)}
                </div>
                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">{member.name}</span>
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0", getStatusStyle(member.status))}>
                      {member.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 truncate">{member.email} · {member.phone}</span>
                </div>
                {/* ID */}
                <span className="text-[11px] text-gray-300 font-mono shrink-0">{member.id}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Footer hint */}
      <div className="px-4 py-2 border-t border-gray-50 flex items-center gap-1.5">
        <User size={12} className="text-gray-300" />
        <span className="text-[11px] text-gray-300">Search by name, email, phone, or ID</span>
      </div>
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
interface MemberSearchProps {
  /** "desktop" renders an always-visible input; "mobile" renders an icon + overlay */
  variant: "desktop" | "mobile";
  className?: string;
}

export function MemberSearch({ variant, className }: MemberSearchProps) {
  const [query, setQuery]               = useState("");
  const [isFocused, setIsFocused]       = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [selected, setSelected]         = useState<Member | null>(null);
  const inputRef                        = useRef<HTMLInputElement>(null);
  const containerRef                    = useRef<HTMLDivElement>(null);

  const results = searchMembers(query);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        if (variant === "mobile") setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [variant]);

  // Auto-focus when mobile overlay opens
  useEffect(() => {
    if (mobileOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [mobileOpen]);

  const handleSelect = useCallback((member: Member) => {
    setSelected(member);
    setQuery("");
    setIsFocused(false);
    setMobileOpen(false);
    // TODO: implement member selection action
    console.log("Selected member:", member);
  }, []);

  const clearQuery = () => { setQuery(""); inputRef.current?.focus(); };

  // ── Desktop variant ────────────────────────────────────────────────────────
  if (variant === "desktop") {
    return (
      <div ref={containerRef} className={cn("relative w-full max-w-[360px]", className)}>
        <div className={cn(
          "flex items-center gap-2 h-10 px-3.5 rounded-xl border transition-all duration-200 bg-gray-50",
          isFocused
            ? "border-violet-300 bg-white ring-2 ring-violet-100 shadow-sm"
            : "border-gray-200 hover:border-gray-300"
        )}>
          <Search size={16} className={cn("shrink-0 transition-colors", isFocused ? "text-violet-500" : "text-gray-400")} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            placeholder="Search member by name, ID, phone…"
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
          {query && (
            <button onClick={clearQuery} className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {isFocused && (
          <MemberDropdown results={results} query={query} onSelect={handleSelect} />
        )}
      </div>
    );
  }

  // ── Mobile variant ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Icon trigger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors",
          className
        )}
        aria-label="Search members"
      >
        <Search size={20} />
      </button>

      {/* Search overlay — slides down below the navbar */}
      {mobileOpen && (
        <div
          ref={containerRef}
          className="fixed top-16 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-lg px-4 py-3"
        >
          <div className={cn(
            "flex items-center gap-2 h-11 px-3.5 rounded-xl border transition-all duration-200",
            "border-violet-300 bg-white ring-2 ring-violet-100 shadow-sm"
          )}>
            <Search size={16} className="shrink-0 text-violet-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, ID, email, phone…"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
            />
            <button
              onClick={() => { setMobileOpen(false); setQuery(""); }}
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Results pinned below the input bar */}
          {query.trim() && (
            <div className="mt-2 rounded-2xl border border-gray-100 overflow-hidden shadow-md">
              <MemberDropdown results={results} query={query} onSelect={handleSelect} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
