import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";

export default function AddPostForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [title, settitle] = React.useState("");
  const [content, setcontent] = React.useState("");
  const [userId, setuserId] = React.useState("");
  const [addRequestStatus, setaddRequestStatus] = React.useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChanged = (e) => settitle(e.target.value);
  const onContentChanged = (e) => setcontent(e.target.value);
  const onAuthorChanged = (e) => setuserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setaddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        settitle("");
        setcontent("");
        setuserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setaddRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <React.Fragment>
      <section className="mb-6">
        <h2 className="text-xl mt-6 font-bold mb-4">Add a new Post</h2>
        <form
          htmlFor="postTitle"
          className="flex flex-col justify-center pr-12"
        >
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
            value={userId}
            onChange={onAuthorChanged}
            className="border gray-amber-300 mb-4"
          >
            <option value=""></option>
            {usersOptions}
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
        </form>
      </section>
    </React.Fragment>
  );
}
