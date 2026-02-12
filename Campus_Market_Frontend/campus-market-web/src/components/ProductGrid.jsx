function ProductGrid({
    displayedProducts,
    // products,
    // viewMode,
    // selectedCategories,
    // searchTerm,
    // sortType,
    setSelectedProduct,
    currentUser,
    onDelete,
    onClear
}) {
        return(
        <div className={"mt-8"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.length > 0
                    ? (displayedProducts).map(product => (
                        <div key={product.id}
                             onClick={() => setSelectedProduct(product)}
                             className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                            <div className="h-48 w-full bg-gray-200">
                                {product.imageUrl ? (
                                    <img
                                        src={`http://localhost:8080${product.imageUrl}`}
                                        alt={product.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                )}
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                                             Seller: {product.user ? product.user.username : 'Anonymous'}
                                            </span>
                                </div>
                                <p className="text-blue-600 font-bold text-xl my-2">${product.price}</p>
                                <p className="text-gray-500 text-sm">{product.description}</p>
                                <div className="mt-4 space-y-2">
                                    <button className="w-full mt-4 border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
                                        Contact Seller
                                    </button>
                                    {/*Delete button only shows when
                                            1. currentUser != null
                                            2. product.user != null
                                            3. currentUser.id === product.user.id*/}
                                    {currentUser && product.user && (product.user.id === currentUser.id) ? (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(product.id);
                                            }}
                                            className="w-full mt-2 text-red-500 border border-red-500 py-1 rounded-lg hover:bg-red-50 transition"
                                        >
                                            Delete Item
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <div className="text-64px mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-800">No Items Found </h3>
                            <p className="text-gray-500 mt-2 text-center max-w-xs">
                                Try adjusting your search keywords or filters to find more.
                            </p>
                            <button
                                onClick={onClear}
                                className="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 transition shadow-sm"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default ProductGrid