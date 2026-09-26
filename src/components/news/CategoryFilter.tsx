interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors border ${
            active === cat
              ? 'bg-[#C8102E] text-white border-[#C8102E]'
              : 'bg-white text-[#171717] border-gray-300 hover:border-[#C8102E] hover:text-[#C8102E]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
