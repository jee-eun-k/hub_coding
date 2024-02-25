"use client";

import { useRouter } from "next/navigation";
import { addPost, editPost } from "@/api/route";
import { postState, postListState } from "@/store/state";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import reactStringReplace from "react-string-replace";

export default function Post() {
  const router = useRouter();

  const [post, setPost] = useRecoilState(postState);
  const posts = useRecoilValue(postListState);

  const [id, setId] = useState(post.id);
  const [title, setTitle] = useState(post.post.title);
  const [content, setContent] = useState(post.post.content);
  const [mode, setMode] = useState("read");

  const getLinkedContent = () => {
    let originalText = content;
    posts.map((post) => {
      const keyword = post.post.title;
      if (post.id !== id) {
        originalText = reactStringReplace(originalText, keyword, (_, idx) => (
          <a
            key={`${keyword}_${idx}`}
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setPost(post)}
          >
            {keyword}
          </a>
        ));
      }
    });
    return <div>{originalText}</div>;
  };

  useEffect(() => {
    setId(post.id);
    setTitle(post.post.title);
    setContent(post.post.content);
  }, [post]);

  return (
    <>
      <button
        onClick={() => {
          if (id && mode === "edit") {
            setMode(() => "read");
          } else {
            router.push("/");
          }
        }}
      >
        {id && mode === "edit" ? "취소" : "목록"}
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
        {
          <div style={{ width: "60vw" }}>
            <div style={{ width: "100%" }}>
              <label htmlFor="post-id" style={{ marginRight: "10px" }}>
                제목
              </label>
              <input
                id="post-id"
                style={{ width: "90%" }}
                value={title}
                disabled={id && mode === "read"}
                maxLength={70}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div style={{ width: "100%", display: 'flex' }}>
              <label htmlFor="post-content" style={{ marginRight: "10px" }}>
                내용
              </label>
              <textarea
                id="post-content"
                style={{ height: "20vh", width: "90%", resize: "none" }}
                value={content}
                disabled={id && mode === "read"}
                readOnly={id && mode === "read"}
                maxLength={800}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
              />
            </div>
          </div>
        }
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
          <button
            onClick={async () => {
              if (id) {
                await editPost({
                  id: post.id,
                  title: title,
                  content: content,
                }).then((response) => {
                  if (response.status === 200) {
                    alert("수정 성공");
                    router.push("/");
                  } else {
                    alert("수정 실패");
                  }
                });
              } else {
                await addPost({
                  title: title,
                  content: content,
                }).then((response) => {
                  if (response.status === 200) {
                    alert("등록 성공");
                    router.push("/");
                  } else {
                    alert("등록 실패");
                  }
                });
              }
            }}
          >
            {"저장"}
          </button>
        )}
      </div>
    </>
  );
}
