import {useState} from "react";

function PostModal(
    {
        currentUser,
        product,
        categories,
        onShow,
        fetchProducts,
        previewUrl,
        setProduct,
        imageFile,
        onImageSelect,
        onClose
    }
){
    const [imageError, setImageError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', product.title);
        formData.append("price", product.price);
        formData.append("description", product.description);
        if(currentUser){
            formData.append("userId", currentUser.id)
        }
        if(!imageFile || imageError){
            alert("Please select a valid image.");
            return;
        }
        if(imageFile){
            formData.append("image", imageFile);
        }
        if(!product.category){
            alert("Please select a category for your item.");
            return;
        }
        formData.append("category", product.category);
        fetch('http://localhost:8080/api/products/with-image',{
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(() => {
                fetchProducts();
                onShow(false);
                onClose();
                setProduct({title: '', price: '', description: '', category: ''});
            })
    };

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        setImageError(null);
        if(file.size > MAX_FILE_SIZE){
            const msg = "File is too large! Maximum limit is 5MB!"
            setImageError(msg);
            onClose();
            e.target.value = "";
            alert(msg);
            return;
        }
        if(!file.type.startsWith("image/")){
            const msg = "Invalid file type! Please select an image!"
            setImageError(msg);
            onClose();
            e.target.value = "";
            alert(msg);
            return;
        }
        if(previewUrl){
            URL.revokeObjectURL(previewUrl);
        }
        onImageSelect(file, URL.createObjectURL(file));
    };


    return(
        <div className="modal-overlay">
            <div className="absolute inset-0" onClick={() => onShow(false)}></div>
            <div className="modal-container">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Post New Item
                    </h2>
                    <button
                        onClick={() => onShow(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <span className="text-2xl">
                                        ×
                                    </span>
                    </button>
                </div>

                <form
                    key ={currentUser?.id || 'guest'}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Item Title
                        </label>
                        <input
                            type="text" placeholder="Item Title" required
                            className="input-field"
                            value={product.title}
                            onChange={(e) => setProduct({...product, title: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price ($)
                            </label>
                            <input
                                type="number" placeholder="0.00" required
                                className="input-field"
                                value={product.price}
                                onChange={(e) => setProduct({...product, price: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Image
                            </label>
                            <input
                                type="file" accept="image/*"
                                onChange={handleImageChange}
                                className={`input-field ${imageError? 'border-red-500' : ''}`}
                            />
                            {imageError && (
                                <p className= "text-red-500 text-xs font-bold animate-pulse">
                                    ⚠️ {imageError}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Category <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.filter(c => c.value !== "ALL").map(cat =>(
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setProduct({...product, category: cat.value})}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                        product.category === cat.value
                                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                            : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
                                    }`}
                                >
                                    {cat.label}
                                    {product.category === cat.value && <span className="ml-1">✓</span> }
                                </button>
                            ))}
                        </div>
                        {!product.category && (
                            <p className="text-gray-400 text-xs mt-2">Please select one category for your item.</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            placeholder="Condition, pickup location, etc." required rows="3"
                            className="input-field"
                            value={product.description}
                            onChange={(e) => setProduct({...product, description: e.target.value})}
                        ></textarea>
                    </div>

                    {previewUrl && (
                        <div className="mt-2 relative">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="h-32 w-full object-cover rounded-lg border"
                            />
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!imageFile || imageError}
                        className={`btn-primary mt-2 ${(!imageFile|| imageError) ?
                            "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none" : ""}`}
                    >
                        List It Now
                    </button>
                </form>

            </div>
        </div>
    )
}
export default PostModal