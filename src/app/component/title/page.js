"use client";

import { useRouter } from "next/navigation";
import { postState } from "@/store/state";
import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

export default function Title({ post }) {
  const router = useRouter();
  const setSelectedPost = useSetRecoilState(postState);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(post ? post.post.title : "");
  }, []);
  
  return (
    <li
      style={{
        width: "90%",
        textDecoration: "underline",
        cursor: "pointer",
      }}
      onClick={() => {
        setSelectedPost(post);
        router.push("/component/post");
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "100%",
          textDecoration: "underline",
        }}
      >
        {title}
      </span>
    </li>
  );
}
