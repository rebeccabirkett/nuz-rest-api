export const Posts = (name, email, posts) => {
  return (
    <div>
      <h1>
        {name} | {email}
      </h1>

      <p>Posts:</p>
      {posts.map((item, index) => {
        return (
          <div key={index}>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </div>
        );
      })}
    </div>
  );
};