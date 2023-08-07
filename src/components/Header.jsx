import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCounter, increaseCount } from "../features/posts/postsSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCounter);
  return (
    <header className="flex justify-between font-bold text-2xl">
      <h1>Redux Blog</h1>
      <nav>
        <ul className="flex justify-around gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
          <li>
            <Link to="user">users</Link>
          </li>
        </ul>
        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  );
};
