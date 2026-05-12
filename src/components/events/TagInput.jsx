import { useState } from 'react';
import { X } from 'lucide-react';

export const TagInput = ({ value = [], onChange }) => {
    const [input, setInput] = useState('');

    const addTag = () => {
        const tag = input.trim();
        if (!tag || value.includes(tag) || value.length >= 10) return;
        onChange([...value, tag]);
        setInput('');
    };

    const removeTag = (tag) => onChange(value.filter((t) => t !== tag));

    return (
        <div className="flex flex-wrap gap-2 items-center min-h-[52px] bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 focus-within:border-blue-600 transition-colors">
            {value.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 text-zinc-800 text-xs font-bold pl-3 pr-2 py-1.5 rounded-full shadow-sm">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-zinc-400 hover:text-red-500 transition-colors">
                        <X size={14} />
                    </button>
                </span>
            ))}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ',') && (e.preventDefault(), addTag())}
                placeholder="Add tags..."
                className="flex-1 bg-transparent text-sm outline-none px-2 min-w-[120px]"
            />
        </div>
    );
};