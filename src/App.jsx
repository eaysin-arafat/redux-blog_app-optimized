import "./App.css";
import AddPostForm from "./features/posts/AddPostForm";
import PostList from "./features/posts/PostList";

function App() {
  return (
    <>
      <div className="p-10 h-screen w-screen">
        <AddPostForm />
        <PostList />
      </div>
    </>
  );
}

export default App;
