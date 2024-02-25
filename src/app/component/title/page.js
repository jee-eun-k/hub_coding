"use client";

import { useRouter } from "next/navigation";
import { postState } from "@/store/state";
import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

export default function Title({ post }) {
  const router = useRouter();
  const setSelectedPosts = useSetRecoilState(postState);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(post ? post.post.title : "");
  }, []);

  return (
    <li
      style={{
        width: "90%",
      }}
      onClick={() => {
        setSelectedPosts(post);
        router.push("/component/post");
      }}
    >
      <span
        className="line-space-break link"
        style={{
          display: "inline-block",
          width: "100%",
        }}
      >
        {title}
      </span>
    </li>
  );
}
