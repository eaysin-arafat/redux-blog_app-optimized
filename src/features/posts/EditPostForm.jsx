import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedPostbyId, updatePost, deletePost } from "./postsSlice";
import { selectAllUsers } from "../users/userSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const users = useSelector(selectAllUsers);
  const post = useSelector((state) => selectedPostbyId(state, Number(id)));

  const [title, settitle] = React.useState(post?.title);
  const [content, setcontent] = React.useState(post?.body);
  const [userId, setuserId] = React.useState(post?.id);
  const [RequestStatus, setRequestStatus] = React.useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not Found</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => settitle(e.target.value);
  const onContentChanged = (e) => setcontent(e.target.value);
  const onAuthorChanged = (e) => setuserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && RequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        settitle("");
        setcontent("");
        setuserId("");
        navigate(`/post/${id}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id }));

      settitle("");
      setcontent("");
      setuserId("");
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <React.Fragment>
      <section className="mb-6">
        <h2 className="text-3xl font-bold mb-4">Add a new Post</h2>
        <form action="" className="flex flex-col justify-center pr-12">
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
            className="border gray-amber-300 mb-2"
            placeholder="Title"
          />

          <label htmlFor="postAuthor">Author:</label>
          <select
            id="postAuthor"
            defaultValue={userId}
            onChange={onAuthorChanged}
            className="border gray-amber-300 mb-4"
          >
            <option value=""></option>
            {userOptions}
          </select>

          <input
            type="text"
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            className="border gray-amber-300 mb-4"
            placeholder="Content"
          />
          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
            className="bg-gray-500 text-white font-bold"
          >
            Save Post
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white font-bold"
            onClick={onDeletePostClicked}
          >
            Delete Post
          </button>
        </form>
      </section>
    </React.Fragment>
  );
}
