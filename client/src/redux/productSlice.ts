import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id?: string;
    name: string;
    description?: string;
    category: string;
    price: number;
    stockQuantity: number;
    images?: string[];
    attributes?: Record<string, string>;
    available: boolean;
}

// Define initial state
interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

// **Async thunk to fetch products**
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_DATASOURCE_URL}/product`);
        if (!response.ok) throw new Error("Failed to fetch products");
        return await response.json();
    // eslint-disable-next-line
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// **Async thunk to add a product**
export const addProduct = createAsyncThunk("products/addProduct", async (newProduct: Product, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_DATASOURCE_URL}/product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });
        if (!response.ok) throw new Error("Failed to add product");
        return await response.json();
    // eslint-disable-next-line
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// **Async thunk to update a product**
export const updateProduct = createAsyncThunk("products/updateProduct", async (updatedProduct: Product, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_DATASOURCE_URL}/product/${updatedProduct.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        });
        if (!response.ok) throw new Error("Failed to update product");
        return await response.json();
    // eslint-disable-next-line
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// **Async thunk to delete a product**
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId: string, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.PRODUCT_DATASOURCE_URL}/product/${productId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete product");
        return productId;
    // eslint-disable-next-line
    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

// **Create Redux Slice**
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.products = state.products.filter(p => p.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;
