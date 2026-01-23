import type { Prompt } from "@/types/prompt";
import PromptCard from "./PromptCard";

interface PromptGridProps {
  prompts: Prompt[];
}

const PromptGrid = ({ prompts }: PromptGridProps) => {
  if (prompts.length === 0) {
    return (
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-lg">
            No prompts found. Try adjusting your search or filter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prompts.map((prompt, index) => (
            <PromptCard key={prompt.id} prompt={prompt} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptGrid;
