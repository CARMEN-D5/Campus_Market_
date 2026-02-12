function SearchBar({
    keyword,
    setKeyword
}) {
    return(
        <div className="flex-1">
            <input
                type="text"
                placeholder="Search for items (e.g. bike, textbook...)"
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    )
}

export default SearchBar