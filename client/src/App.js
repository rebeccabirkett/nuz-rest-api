import "./App.css";
import { useEffect, useState } from "react";

import { fetchUsers } from "./utils";
import { UserForm } from "./components/UserForm";
import { PostForm } from "./components/PostForm";
// import { Posts } from "./components/Posts.jsx";
import { Post } from "./components/Post.jsx";
// React app to render posts
// add a new post for user

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  const getUsersPosts = async (index) => {
    const response = await fetch(
      `http://localhost:5000/posts/${users[index]._id}`
    );
    const data = await response.json();
    console.log(data);
    setPosts(data);
    setUser(users[index]);
  };

  // adding a post
  const addPost = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/posts/${user._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const data = await response.json();

    let tempArr = [...posts];
    tempArr.push(data);
    setPosts(tempArr);
    setTitle("");
    setContent("");
  };

  return (
    <div className="App">
      <h1>Blog Machine</h1>
      <UserForm getUsersPosts={getUsersPosts} users={users} />
        <div>
          {user && posts.map((item, index) => <Post key={index} post={item} />)}
        </div>
        <div className="postFormWrapper">
          <PostForm
            addPost={addPost}
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
          />
        </div>
    </div>
  );
};

export default App;