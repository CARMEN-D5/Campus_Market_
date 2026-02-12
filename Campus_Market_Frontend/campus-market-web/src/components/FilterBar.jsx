function FilterBar({
    categories,
    selectedCategories,
    setSelectedCategories

}) {

    return(
        <div className="flex flex-wrap gap-2 mb-6">
            <button
                onClick={() => setSelectedCategories([])}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategories.length === 0
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
            >
                ALL Items
            </button>

            {categories.filter(cat => cat.value !== "ALL")
                .map(cat => {
                    const isSelected = selectedCategories.includes(cat.value);
                    return (
                        <button
                            key={cat.value}
                            onClick={() => {
                                if (isSelected) {
                                    setSelectedCategories(selectedCategories.filter(c => c !== cat.value));
                                } else {
                                    setSelectedCategories([...selectedCategories, cat.value]);
                                }
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1
                                        ${isSelected ? "bg-blue-100 text-blue-700 border-blue-500 shadow-sm"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            {cat.label}
                            {isSelected && <span> ✕</span>}
                        </button>
                    );
                })
            }
        </div>

    )
}

export default FilterBar