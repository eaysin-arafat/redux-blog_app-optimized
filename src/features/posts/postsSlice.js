import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  // {
  //   id: 1,
  //   title: "Generated Action Types for Slices",
  //   content:
  //     "If you need to reuse reducer logic, it is common to write higher-order reducers that wrap a reducer function with additional common behavior. This can be done with createSlice as well, but due to the complexity of the types for createSlice",
  //   date: sub(new Date(), { minutes: 4 }).toISOString(),
  //   reactions: {
  //     thumbsUp: 0,
  //     wow: 0,
  //     heart: 0,
  //     rocket: 0,
  //     coffee: 0,
  //   },
  // },
  // {
  //   id: 2,
  //   title: "Generated Action Types for Slices",
  //   content:
  //     "If you need to reuse reducer logic, it is common to write higher-order reducers that wrap a reducer function with additional common behavior. This can be done with createSlice as well, but due to the complexity of the types for createSlice",
  //   date: sub(new Date(), { minutes: 2 }).toISOString(),
  //   reactions: {
  //     thumbsUp: 0,
  //     wow: 0,
  //     heart: 0,
  //     rocket: 0,
  //     coffee: 0,
  //   },
  // },
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  } catch (err) {
    return err.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reactions } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reactions]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };
          return post;
        });
        // add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
