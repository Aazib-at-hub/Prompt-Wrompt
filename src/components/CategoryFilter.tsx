import type { Category } from "@/types/prompt";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="relative z-10 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`category-chip ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
