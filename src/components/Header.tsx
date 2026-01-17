import { Search } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="relative z-10 pt-8 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Prompt-Wrompt
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-[400px] lg:w-[500px]">
            <input
              type="text"
              placeholder="Search for prompts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input pr-14"
            />
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-6 h-6 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center md:text-left text-muted-foreground mt-4 text-lg">
          Copy better AI prompts instantly
        </p>
      </div>
    </header>
  );
};

export default Header;
