import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchCategories,
  fetchColors,
  fetchProductById,
  fetchProductYouMayAlsoLike,
  fetchProducts,
  fetchSizes,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  productYouMayAlsoLike: [],
  categories: [],
  sizes: [],
  colors: [],
  selectedProduct: null,
  status: "idle",
};
export const fetchProductsAsync = createAsyncThunk(
  "product/fetchProducts",
  async (filter) => {
    const response = await fetchProducts(filter);
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);
export const fetchColorsAsync = createAsyncThunk(
  "product/fetchColors",
  async () => {
    const response = await fetchColors();
    return response.data;
  }
);
export const fetchSizesAsync = createAsyncThunk(
  "product/fetchSizes",
  async () => {
    const response = await fetchSizes();
    return response.data;
  }
);
export const fetchProductYouMayAlsoLikeAsync = createAsyncThunk(
  "product/fetchProductYouMayAlsoLike",
  async () => {
    const response = await fetchProductYouMayAlsoLike();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchColorsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColorsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.colors = action.payload;
      })
      .addCase(fetchSizesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSizesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.sizes = action.payload;
      })
      .addCase(fetchProductYouMayAlsoLikeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductYouMayAlsoLikeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.productYouMayAlsoLike = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectColors = (state) => state.product.colors;
export const selectSizes = (state) => state.product.sizes;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectProductYouMayAlsoLike = (state) =>
  state.product.productYouMayAlsoLike;

export default productSlice.reducer;
