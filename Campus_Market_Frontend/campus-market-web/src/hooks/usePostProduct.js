import {useState} from "react";

export function usePostProduct() {
    const [showForm, setShowForm] = useState(false);
    const [newProduct, setNewProduct] = useState({title: '', price: '', description: '', category: ''});
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    return{
        showForm,
        setShowForm,
        newProduct,
        setNewProduct,
        imageFile,
        setImageFile,
        previewUrl,
        setPreviewUrl
    };
}