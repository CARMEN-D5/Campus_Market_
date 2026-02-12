import {useState} from 'react'
import Navbar from "./components/Navbar.jsx";
import ProductModal from "./components/modals/ProductModal.jsx";
import PostModal from "./components/modals/PostModal.jsx";
import FilterBar from "./components/FilterBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import AuthModal from "./components/modals/AuthModal.jsx";
import SortSelect from "./components/SortSelect.jsx";
import {useProducts} from "./hooks/useProducts.js";
import {useMarketPage} from "./hooks/useMarketPage.js";
import {useAuth} from "./context/AuthContext.jsx"
import {CATEGORIES} from "./constants/categories.js";
import {usePostProduct} from "./hooks/usePostProduct.js";

function App() {
    const {showForm, setShowForm, newProduct, setNewProduct, imageFile, setImageFile, previewUrl, setPreviewUrl} = usePostProduct();
    const {currentUser, login, register, logout} = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    const {searchTerm, setSearchTerm, sortType, setSortType, selectedCategories, setSelectedCategories, viewMode,
        setViewMode, resetFilters} = useMarketPage();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const {displayedProducts,fetchProducts, deleteProduct} = useProducts(
        {viewMode,currentUser,
            selectedCategories,searchTerm,sortType});

    // Delete Product
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return ;
        deleteProduct(id, currentUser.id);
        setSelectedProduct(null);
    };

    // Clear-up events after logging out
    const handleLogOut = () => {
        logout();
        setImageFile(null);
        if(previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setNewProduct({ title: '', price: '', description: '' });
        setShowForm(false);
        setViewMode("ALL");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <Navbar
                currentUser={currentUser}
                showForm={showForm}
                onLoginClick={() => setShowAuthModal(true)}
                onLogout={() => {handleLogOut()}}
                onTogglePost={() => setShowForm(!showForm)}
            />

            {/* Main Content */}
            <main className="container mx-auto p-6">
                {/* Post Product Modal*/}
                {showForm &&(
                    <PostModal
                        currentUser = {currentUser}
                        product = {newProduct}
                        categories = {CATEGORIES}
                        onShow = {setShowForm}
                        fetchProducts = {fetchProducts}
                        previewUrl = {previewUrl}
                        setProduct = {setNewProduct}
                        imageFile = {imageFile}
                        onImageSelect = {(file, previewUrl) => {
                            setImageFile(file);
                            setPreviewUrl(previewUrl);
                        }}
                        onClose = {() => {setImageFile(null); setPreviewUrl(null);}}
                    />
                )}

                {/* Filter Bar*/ }
                <FilterBar
                    categories = {CATEGORIES}
                    selectedCategories = {selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />

                {currentUser && (
                    <div className="flex bg-gray-200 p-1 rounded-xl w-fit mb-6 shadow-inner">
                        <button
                            onClick={() => setViewMode("ALL")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                                viewMode === "ALL" ? "bg-white text-blue-600 shadow-wd"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            All Market
                        </button>
                        <button
                            onClick={() => setViewMode("MINE")}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                                viewMode === "MINE" ? "bg-white text-blue-600 shadow-wd"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            My Listings
                        </button>
                    </div>

                )}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Search Bar */}
                    <SearchBar
                        keyword = {searchTerm}
                        setKeyword = {setSearchTerm}
                    />

                    {/* Sorted Type */}
                    <SortSelect
                        sortType = {sortType}
                        setSortType = {setSortType}
                    />
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mb-6">Latest Listings</h2>

                {/* Product Grid */}
                <ProductGrid
                    displayedProducts = {displayedProducts}
                    setSelectedProduct = {setSelectedProduct}
                    currentUser = {currentUser}
                    onDelete = {handleDelete}
                    onClear = {resetFilters}
                />
            </main>

            {/* Auth Modal */}
            {showAuthModal && (
                <AuthModal
                    login={login}
                    register={register}
                    onShow={setShowAuthModal}
                    loginView={isLoginView}
                    setLoginView={setIsLoginView}
                />
            )}

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    currentUser={currentUser}
                    onClose={() => setSelectedProduct(null)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default App