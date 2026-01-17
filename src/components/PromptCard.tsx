import { Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Prompt } from "@/types/prompt";
import { toast } from "@/hooks/use-toast";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

const PromptCard = ({ prompt, index }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt_text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const description = prompt.prompt_text;
  const displayCategory = prompt.category ?? "Uncategorized";

  return (
    <div 
      className="prompt-card opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent-foreground">
          {displayCategory}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">
        {prompt.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span 
            key={tag}
            className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="copy-button flex items-center gap-2"
        disabled={copied}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy
          </>
        )}
      </button>
    </div>
  );
};

export default PromptCard;
