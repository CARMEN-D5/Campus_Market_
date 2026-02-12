import {useState} from "react";

export function useMarketPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortType, setSortType] = useState("latest")
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [viewMode, setViewMode] = useState("ALL");

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedCategories([]);
        setViewMode("ALL");
    };

    return{
        searchTerm,
        setSearchTerm,
        sortType,
        setSortType,
        selectedCategories,
        setSelectedCategories,
        viewMode,
        setViewMode,
        resetFilters
    };
}