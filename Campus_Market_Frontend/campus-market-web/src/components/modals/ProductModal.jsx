function ProductModal({
     product,
     currentUser,
     onDelete,
     onClose
 }) {
    if(!product) return null;

    return (
        <div className="modal2-bg absolute inset-0 bg-black/60 backdrop-blur-sm"
             onClick={onClose}
        >
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition shadow-lg">
                    <span className="text-xl">×</span>
                </button>

                <div className="flex flex-col md:flex-row">

                    {/*image*/}
                    <div className="md:w-1/2 h-64 md:h-auto bg-gray-100">
                        {product.imageUrl ? (
                            <img
                                src={`http://localhost:8080${product.imageUrl}`}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        ) :(
                            <div
                                className="w-full h-full flex items-center justify-center text-gray-400 text-sm"
                            >
                                No Image
                            </div>
                        )}
                    </div>

                    {/*details*/}
                    <div className={"md:w-1/2 p-8 space-y-4"}>
                        <div>
                            <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full uppercase">
                                {product.category}
                            </span>
                            <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                {product.title}
                            </h2>
                            <p className="text-2xl font-black text-blue-600 mt-1">
                                ${product.price}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-sm font-semibold text-gray-500 uppercase">
                                Description
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-1">
                                {product.description}
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-4 flex items-center justify-between">

                            <div className="text-sm">
                                <p className="text-gray-400"> Listed by</p>
                                <p className="font-bold text-gray-700">
                                    {product.user?.username || 'Anonymous'}
                                </p>
                            </div>

                            {/*Delete button shows only when currentUser === product.user*/}
                            {currentUser && product.user?.id === currentUser.id
                                ? (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(product.id);
                                        }}
                                        className="bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition"
                                    >
                                        Delete Item
                                    </button>
                                ) : (
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                                        Contact Seller
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductModal