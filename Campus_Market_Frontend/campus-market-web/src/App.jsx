import { useState, useEffect } from 'react'



function App() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({title: '', price: '', description: ''});
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    const [authData, setAuthData] = useState({username:'', password:''});

    // Fetch product list
    const fetchProducts = () => {
        fetch('http://localhost:8080/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }

    useEffect(() => {fetchProducts(); }, []);

    // Handle image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            if(previewUrl){
                URL.revokeObjectURL(previewUrl);
            }
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file))
        }
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newProduct.title);
        formData.append("price", newProduct.price);
        formData.append("description", newProduct.description);
        if(imageFile){
            formData.append("image", imageFile);
        }
        if(currentUser){
            formData.append("userId", currentUser.id)
        }

        fetch('http://localhost:8080/api/products/with-image',{
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(() => {
            fetchProducts();
            setShowForm(false);
            setImageFile(null);
            setPreviewUrl(null);
            setNewProduct({title: '', price: '', description: ''});
        })
    };

    // Delete Product
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")){
            fetch(`http://localhost:8080/api/products/${id}`, {
                method: 'DELETE',
            })
            .then(() => {
                fetchProducts();
            })
            .catch(err => console.error(err));
        }
    };

    // Handle Authentication
    const handleAuth = (e) => {
        e.preventDefault();
        const endpoint = isLoginView ? '/api/users/login' : '/api/users/register';

        fetch(`http://localhost:8080${endpoint}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(authData)
        })
        .then(res => {
            if (!res.ok) throw new Error('Auth failed');
            return res.json();
        })
        .then(user => {
            setCurrentUser(user);
            setShowAuthModal(false);
            setAuthData({username:'', password:''});
            alert(isLoginView? 'Welcome back!' : 'Account created');
        })
        .catch(err => alert('Error' + err.message));
    };

    // Clear-up events after logging out
    const handleLogOut = () => {
        setCurrentUser(null);
        setImageFile(null);
        if(previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setNewProduct({ title: '', price: '', description: '' });
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-blue-600 p-4 text-white shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold uppercase tracking-wider">Campus Market</h1>
                    <div className="flex gap-4 items-center">
                        {currentUser ? (
                            <>
                                <span className="text-blue-100">Hi, {currentUser.username}</span>
                                <button
                                    onClick={() => setShowForm(!showForm)}
                                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                                    {showForm ? "Close" : "Post Item"}
                                </button>
                                <button
                                    onClick={() => handleLogOut()}
                                    className="text-sm underline">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto p-6">
                {/* Post Product Modal*/}
                {showForm &&(
                    <div className="modal-overlay">
                        <div className="absolute inset-0" onClick={() => setShowForm(false)}></div>
                        <div className="modal-container">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Post New Item
                                </h2>
                                <button
                                    onClick={() => setShowForm(false)}
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
                                        value={newProduct.title}
                                        onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
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
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-meduim text-gray-700 mb-1">
                                            Image
                                        </label>
                                        <input
                                            type="file" accept="image/*" required
                                            onChange={handleImageChange}
                                            className="w-full p-2 border rounded-lg text-sm text-gray-500 file:mr-4 file:py-2
                                        file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-meduim text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Condition, pickup location, etc." required rows="3"
                                        className="input-field"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
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
                                            onClick={() => {setImageFile(null); setPreviewUrl(null);}}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}

                                <button type="submit"
                                        className="btn-primary mt-2">
                                    List It Now
                                </button>
                            </form>

                        </div>
                    </div>
                )}

                <h2 className="text-xl font-semibold text-gray-700 mb-6">Latest Listings</h2>
                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
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
                                            onClick={() => handleDelete(product.id)}
                                            className="w-full mt-2 text-red-500 border border-red-500 py-1 rounded-lg hover:bg-red-50 transition"
                                        >
                                            Delete Item
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Auth Modal */}
            {showAuthModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        onClick={() => setShowAuthModal(false)}
                    ></div>

                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
                        <button
                            onClick={() => setShowAuthModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                            <span className="text-xl">×</span>
                        </button>

                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {isLoginView ? 'Welcome back!' : 'Join Campus Market'}
                        </h2>

                        <form onSubmit={handleAuth} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text" placeholder="Enter your username" required
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transtion-all"
                                    value={authData.username}
                                    onChange={(e) => setAuthData({...authData, username: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password" placeholder="••••••••" required
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={authData.password}
                                    onChange={(e) => setAuthData({...authData, password: e.target.value})}
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover: bg-blue-700 transition">
                                {isLoginView ? 'Login' : 'Creat Account'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-gray-600 text-sm">
                            {isLoginView ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLoginView(!isLoginView)}
                                className="text-blue-600 font-bold hover:underline">
                                {isLoginView ? 'Sign Up' : 'Sign In'}
                            </button>
                        </p>

                    </div>

                </div>
            )}
        </div>
    )
}

export default App