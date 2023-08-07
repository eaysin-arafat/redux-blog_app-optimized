import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TImeAgo";
import ReactionButtons from "./ReactionButtons";
import { selectPostById } from "./postsSlice";
import { Link, useParams } from "react-router-dom";

export const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <>
      <article className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="text-lg text-gray-700 font-semibold text-justify">
          {post.body}
        </p>

        <p className="text-sm">
          <Link
            className="block font-bold text-lg"
            to={`/post/edit/${post.id}`}
          >
            Edit Post
          </Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    </>
  );
};
