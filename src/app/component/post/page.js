"use client";

import { useRouter } from "next/navigation";
import { addPost, editPost } from "@/api/route";
import { postState, postListState } from "@/store/state";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import reactStringReplace from "react-string-replace";
import Link from 'next/link'

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
      if (post.id === id) {
        return true;
      }

      originalText = reactStringReplace(originalText, keyword, (_, idx) => {
        return (
          <a
            key={`${keyword}_${idx}`}
            className='link'
            onClick={() => setPost(post)}
          >
            {keyword}
          </a>
        );
      });
    });

    return <div className="line-space-break ">{originalText}</div>;
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
            router.replace("/component/main");
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ width: "60vw" }}>
          <div style={{ width: "100%", display: "flex" }}>
            <label htmlFor="post-id" style={{ marginRight: "10px" }}>
              제목
            </label>
            {id && mode === "read" ? (
              <div className="line-space-break" style={{ fontSize: "15px" }}>
                {title}
              </div>
            ) : (
              <input
                id="post-id"
                style={{ width: "90%", fontSize: "15px" }}
                value={title}
                maxLength={70}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            )}
          </div>
          <div style={{ width: "100%", display: "flex" }}>
            <label htmlFor="post-content" style={{ marginRight: "10px" }}>
              내용
            </label>
            {id && mode === "read" ? (
              <div style={{ fontSize: "15px", height: "25vh", width: "90%" }}>
                {getLinkedContent()}
              </div>
            ) : (
              <textarea
                id="post-content"
                style={{
                  fontSize: "15px",
                  height: "25vh",
                  width: "90%",
                  resize: "none",
                }}
                value={content}
                disabled={id && mode === "read"}
                readOnly={id && mode === "read"}
                maxLength={700}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
              />
            )}
          </div>
        </div>
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
              if (title === "") {
                alert("제목을 입력 해주세요");
                return true;
              }

              if (content === "") {
                alert("내용을 입력 해주세요");
                return true;
              }

              if (id) {
                await editPost({
                  id: post.id,
                  title,
                  content,
                }).then((response) => {
                  if (response.status === 200) {
                    alert("수정 성공");
                    setMode("read");
                  } else {
                    alert("수정 실패");
                  }
                });
              } else {
                await addPost({
                  title: title,
                  content: content,
                }).then((data) => {
                  const response = Response.json({ data });
                  if (response.status === 200) {
                    alert("등록 성공");
                    setPost({
                      id: data.id,
                      post: data.post,
                    });
                    setMode("read");
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
