/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "T",
  hooray: "H",
  heart: "H",
  rocket: "R",
  eyes: "E",
};

export default function ReactionButtons({ post }) {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="p-1 text-sm bg-gray-600 text-white rounded-full font-semibold"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reactions: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div className="flex gap-6">{reactionButtons}</div>;
}
