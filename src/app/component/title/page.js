"use client";

import { useRouter } from "next/navigation";
import { postState } from "@/store/state";
import { useSetRecoilState } from "recoil";

export default function Title({ post }) {
  const router = useRouter();
  const setSelectedPost = useSetRecoilState(postState);

  return (
    <div
      style={{ width: "100vw", height: "40px" }}
      onClick={() => {
        setSelectedPost(post);
        router.push("/component/post");
      }}
    >
      {post.post.title}
    </div>
  );
}
