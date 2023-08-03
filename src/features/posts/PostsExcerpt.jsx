/* eslint-disable react/prop-types */
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TImeAgo";
import ReactionButtons from "./ReactionButtons";

export const PostsExcerpt = ({ post }) => {
  return (
    <>
      <article key={post.id} className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{post.title}</h3>
        <p className="text-lg text-gray-700 font-semibold text-justify">
          {post.body.substring(0, 100)}...
        </p>

        <p className="text-sm">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    </>
  );
};
