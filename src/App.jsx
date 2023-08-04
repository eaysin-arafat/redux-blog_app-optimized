import "./App.css";
import AddPostForm from "./features/posts/AddPostForm";
import PostList from "./features/posts/PostList";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import EditPostForm from "./features/posts/EditPostForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":id" element={<SinglePostPage />} />
          <Route path="edit/:id" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
