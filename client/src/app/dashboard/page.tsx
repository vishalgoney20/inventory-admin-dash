"use client";

import { useState, useEffect } from "react";
import { Container, Typography, Button, Card, CardContent, CardMedia, Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import Image from "next/image"; 
import { fetchProducts } from "@/redux/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector(state => state.products)

    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        dispatch(fetchProducts()); // ✅ Fetch products on mount
    }, [dispatch]);

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        acc[product.category] = acc[product.category] || [];
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, typeof products>);

    return (
        <Container maxWidth="md">
            <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Seller Dashboard</Typography>
                <Link href="/components/addproduct">
                    <Button variant="contained" color="primary">Add Product</Button>
                </Link>
            </Box>

            {loading && <CircularProgress />} {/* ✅ Show loading spinner */}
            {error && <Typography color="error">{error}</Typography>}

            {Object.entries(groupedProducts).map(([category, items]) => (
                <Box key={category} mb={3}>
                    <Typography variant="h5">{category}</Typography>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={2}>
                        {items.slice(0, visibleCount).map((product) => (
                            <Card key={product.id} sx={{ width: "200px", height: "300px", display: "flex", flexDirection: "column" }}>
                                {/* <CardMedia>
                                    <Image src={product.images?.[0] || "/phone.webp"} alt={product.name} width={200} height={150} />
                                </CardMedia> */}
                                <CardMedia>
                                    <Image src={ "/phone.webp"} alt={product.name} width={200} height={150} />
                                </CardMedia>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6">{product.name}</Typography>
                                    <Typography>Price: ${product.price}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            ))}

            {products.length > visibleCount && (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button variant="outlined" onClick={() => setVisibleCount(visibleCount + 4)}>Load More</Button>
                </Box>
            )}
        </Container>
    );
}
