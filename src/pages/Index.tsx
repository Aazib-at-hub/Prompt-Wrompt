import { useEffect, useMemo, useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import PromptGrid from "@/components/PromptGrid";
import type { Category, Prompt } from "@/types/prompt";

const ALL_CATEGORY = "All" satisfies Category;

const Index = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>(ALL_CATEGORY);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await fetch("https://prompt-wrompt2.onrender.com/api/prompts");
        if (!response.ok) throw new Error("Unable to fetch prompts");
        const data: Prompt[] = await response.json();

        const normalized = data.map((prompt) => ({
          ...prompt,
          title: prompt.title?.trim() || "Untitled prompt",
          prompt_text: prompt.prompt_text?.trim() || "",
          category: prompt.category?.trim() || "Uncategorized",
          tags: Array.isArray(prompt.tags) ? prompt.tags : [],
        }));

        setPrompts(normalized);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unexpected error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const categories = useMemo<Category[]>(() => {
    const unique = new Set<string>();
    prompts.forEach((prompt) => {
      if (prompt.category) {
        unique.add(prompt.category);
      }
    });

    return [ALL_CATEGORY, ...Array.from(unique).sort()];
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();

    return prompts.filter((prompt) => {
      const categoryMatch = activeCategory === ALL_CATEGORY || prompt.category === activeCategory;

      const searchMatch =
        searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchLower) ||
        prompt.prompt_text.toLowerCase().includes(searchLower) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(searchLower));

      return categoryMatch && searchMatch;
    });
  }, [prompts, activeCategory, searchQuery]);

  const renderPrompts = () => {
    if (loading) {
      return (
        <div className="relative z-10 px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Loading prompts…</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="relative z-10 px-4 py-20 text-center">
          <p className="text-destructive text-lg">Failed to load prompts: {error}</p>
        </div>
      );
    }

    return <PromptGrid prompts={filteredPrompts} />;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Header 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        
        <HeroSection />
        
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        {renderPrompts()}
        
        {/* Footer */}
        <footer className="relative z-10 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Prompt-Wrompt. Copy better prompts.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
