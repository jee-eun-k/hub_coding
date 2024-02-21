"use client";

import { useRouter } from "next/navigation";
import { addPost, editPost } from "@/api/route";
import { postState, postListState } from "@/store/state";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import reactStringReplace from "react-string-replace";

export default function Post() {
  const router = useRouter();

  const post = useRecoilValue(postState);
  const posts = useRecoilValue(postListState);

  const [id, setId] = useState(post.id);
  const [title, setTitle] = useState(post.post.title);
  const [content, setContent] = useState(post.post.content);
  const [mode, setMode] = useState("read");

  const getLinkedContent = () => {
    const replaced = (context, keyword) =>
      reactStringReplace(post, keyword, (match, i) => (
        <span style={{ color: "red" }}>{match}</span>
      ));

      console.log(posts)
    const text = posts.map((post) => {
      const keyword = post.post.title;
      // return replaced(prev, curr.post.title);
    });
  };

  useEffect(() => {
    posts.map((post) => {
      const postTitle = post.post.title;
      // console.log(postTitle);
    });
  }, [posts]);

  useEffect(() => {
    console.log("id", id === undefined, id === "");
  }, []);

  return (
    <>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        뒤로
      </button>

      <div
        style={{
          padding: "10px",
          margin: "2vw",
          width: "100vw",
          height: "20vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mode === "read" ? (
          <>
            <div>{title}</div>
            {getLinkedContent()}
          </>
        ) : (
          <>
            <input
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
            />
            <textarea
              style={{ height: "20vh" }}
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
              // disabled={true}
            />
          </>
        )}
      </div>
      <div>
        {id && mode === "read" ? (
          <button
            onClick={() => {
              setMode((prev) => {
                return prev === "read" ? "edit" : "read";
              });
            }}
          >
            {"수정모드"}
          </button>
        ) : (
          <></>
        )}
        {mode === "edit" ? (
          <button
            onClick={async () => {
              if (id) {
                await editPost({
                  id: post.id,
                  title: title,
                  content: content,
                }).then((response) => {
                  alert(response.status === 200 ? "수정 성공" : "수정 실패");
                  router.push("/");
                });
              } else {
                await addPost({
                  title: title,
                  content: content,
                }).then((response) => {
                  alert(response.status === 200 ? "등록 성공" : "등록 실패");
                  router.push("/");
                });
              }
            }}
          >
            {id ? "저장" : "등록"}
          </button>
        ) : (
          <button
            onClick={async () => {
              if (id) {
                await editPost({
                  id: post.id,
                  title: title,
                  content: content,
                }).then((response) => {
                  alert(response.status === 200 ? "수정 성공" : "수정 실패");
                  router.push("/");
                });
              } else {
                await addPost({
                  title: title,
                  content: content,
                }).then((response) => {
                  alert(response.status === 200 ? "등록 성공" : "등록 실패");
                  router.push("/");
                });
              }
            }}
          >
            {id ? "저장" : "등록"}
          </button>
        )}
      </div>
    </>
  );
}
