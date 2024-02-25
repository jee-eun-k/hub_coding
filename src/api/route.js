export const SERVER_URI = "http://localhost:4000/result";

export async function getPosts() {
  const res = await fetch(`${SERVER_URI}`, {
    method: "GET",
  });
  const data = await res.json();
  return Response.json({ data });
}

export async function addPost(post) {
  const res = await fetch(`${SERVER_URI}`, {
    method: "POST",
    body: JSON.stringify({
      post: { content: post.content, title: post.title },
    }),
  });
  const data = await res.json();
  return Response.json({ data });
}

export async function editPost(post) {
  const res = await fetch(`${SERVER_URI}/${post.id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: post.id,
      post: { content: post.content, title: post.title },
    }),
  });
  const data = await res.json();
  return Response.json({ data });
}
