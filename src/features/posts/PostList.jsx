import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";
import { PostsExcerpt } from "./PostsExcerpt";

export default function PostList() {
  const orderPostIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postsStatus === "succeeded") {
    content = orderPostIds.map((postId) => (
      <PostsExcerpt postId={postId} key={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <section>
        <div>
          <div className="grid grid-cols-2 gap-9">{content}</div>
        </div>
      </section>
    </>
  );
}
