import {useEffect, useMemo, useState} from "react";
import {productApi} from "../api/productApi.js";

export function useProducts({
    viewMode,
    currentUser,
    selectedCategories,
    searchTerm,
    sortType
}) {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const data = await productApi.getAll();
        setProducts(data);
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
    }, []);

    const deleteProduct = async (id, userId) => {
        await productApi.delete(id, userId);
        fetchProducts();
    };

    const displayedProducts = useMemo(() => {
        return products
            .filter(p =>
                viewMode === "MINE" ?
                    p.user?.id === currentUser?.id : true
            )
            // filter selected categories
            .filter(p =>
                selectedCategories.length === 0 ?
                    true : selectedCategories.includes(p.category)
            )
            // filter searched terms
            .filter(p => (
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            ))
            .sort((a, b) => {
                if (sortType === "price-low") {
                    return a.price - b.price;
                } else if (sortType === "price-high") {
                    return b.price - a.price;
                } else {
                    return b.id - a.id;
                }
            });
    }, [products, viewMode, currentUser, selectedCategories, searchTerm, sortType])

    return{displayedProducts,fetchProducts,deleteProduct};
}

