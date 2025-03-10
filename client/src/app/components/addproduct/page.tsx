"use client";

import { useState } from "react";
import { addProduct } from "@/redux/productSlice";
import { useRouter } from "next/navigation";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";

export default function AddProductPage() {
    const dispatch = useAppDispatch();
    const router = useRouter(); // ✅ Used for redirecting
    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        stockQuantity: "",
        images: [""],
        available: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(addProduct({ ...product, price: Number(product.price), stockQuantity: Number(product.stockQuantity) }));
        router.push("/dashboard"); 
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4} mb={4} p={3} boxShadow={3} borderRadius={2}>
                <Typography variant="h5" gutterBottom>Add New Product</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField label="Product Name" fullWidth name="name" value={product.name} onChange={handleChange} required sx={{ mb: 2 }} />
                    <TextField label="Description" fullWidth name="description" value={product.description} onChange={handleChange} sx={{ mb: 2 }} />
                    <TextField label="Category" fullWidth name="category" value={product.category} onChange={handleChange} required sx={{ mb: 2 }} />
                    <TextField label="Price" type="number" fullWidth name="price" value={product.price} onChange={handleChange} required sx={{ mb: 2 }} />
                    <TextField label="Stock Quantity" type="number" fullWidth name="stockQuantity" value={product.stockQuantity} onChange={handleChange} required sx={{ mb: 2 }} />
                    <TextField label="Image URL" fullWidth name="images" value={product.images[0]} onChange={(e) => setProduct({ ...product, images: [e.target.value] })} sx={{ mb: 2 }} />
                    <Button variant="contained" color="primary" type="submit" fullWidth>Add Product</Button>
                </form>
            </Box>
        </Container>
    );
}
