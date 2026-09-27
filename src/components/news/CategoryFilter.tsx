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
              ? 'bg-[#F26926] text-white border-[#F26926]'
              : 'bg-white text-[#171717] border-gray-300 hover:border-[#F26926] hover:text-[#F26926]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
