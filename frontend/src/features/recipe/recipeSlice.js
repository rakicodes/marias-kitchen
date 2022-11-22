import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recipeService from './recipeService'

const initialState = {
    recipes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// create new recipe
export const createRecipe = createAsyncThunk('recipe/create', async (recipeData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await recipeService.createRecipe(recipeData, token);
    } catch (error) {
        const message = (error.respose && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// like recipe
export const likeRecipe = createAsyncThunk('recipe/likeRecipe', async (recipeId, thunkAPI) => {
    try {
        return await recipeService.likeRecipe(recipeId);
    } catch (error) {
        const message = (error.respose && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// delete recipe
export const deleteRecipe = createAsyncThunk('recipe/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await recipeService.deleteRecipe(id, token);
    } catch (error) {
        const message = (error.respose && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// get recipe
export const getRecipe = createAsyncThunk('recipe/getOne', async (id, thunkAPI) => {
    try {
        return await recipeService.getRecipe(id);
    } catch (error) {
        const message = (error.respose && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);

    }
})

// get all recipes
export const getRecipes = createAsyncThunk('recipe/getAll', async (_, thunkAPI) => {
    try {
        return await recipeService.getRecipes();
    } catch (error) {
        const message = (error.respose && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);

    }
})

// get user recipes
export const getUserRecipes = createAsyncThunk('recipe/getUserRecipes', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await recipeService.getUserRecipes(userId, token);
    } catch (error) {
        const message = (error.respose && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);

    }
})

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecipe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createRecipe.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.recipes.push(action.payload)
            })
            .addCase(createRecipe.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(likeRecipe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(likeRecipe.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.recipes = state.recipes.map((recipe) => recipe._id === action.payload._id ? action.payload : recipe)
            })
            .addCase(likeRecipe.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRecipe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRecipe.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.recipes = [action.payload]
            })
            .addCase(getRecipe.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRecipes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRecipes.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.recipes = action.payload
            })
            .addCase(getRecipes.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserRecipes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserRecipes.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.recipes = action.payload
            })
            .addCase(getUserRecipes.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteRecipe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteRecipe.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.recipes = state.recipes.filter((recipe) => recipe._id !== action.payload.id)
            })
            .addCase(deleteRecipe.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = recipeSlice.actions;
export default recipeSlice.reducer