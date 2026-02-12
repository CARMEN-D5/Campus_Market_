function SortSelect({
    sortType,
    setSortType
}){
    return(
        <div className="w-full md:w-48">
            <select
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 outline-none bg-white cursor-pointer"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
            >
                <option value="latest">Latest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
            </select>
        </div>
    )
}

export default SortSelect