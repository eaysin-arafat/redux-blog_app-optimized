import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { PostsExcerpt } from "./PostsExcerpt";

export default function PostList() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    const ordarPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = ordarPosts.map((post) => (
      <PostsExcerpt post={post} key={post.id} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }
  console.log(posts);

  return (
    <>
      <section>
        <div>
          <h2 className="text-center text-3xl font-bold mb-4">Posts</h2>
          <div className="grid grid-cols-2 gap-9">{content}</div>
        </div>
      </section>
    </>
  );
}
