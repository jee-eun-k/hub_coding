"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "../title/page";
import ReactPaginate from "react-paginate";
import { getPosts } from "@/api/route";
import { useRecoilState, useResetRecoilState } from "recoil";
import { postState, postListState } from "@/store/state";

const itemsPerPage = 5;

export default function Main() {
  const router = useRouter();

  const resetPostState = useResetRecoilState(postState);

  const [posts, setPosts] = useRecoilState(postListState);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  const getPostsData = async () => {
    await getPosts()
      .then((response) => response.json())
      .then((data) => setPosts(data.data))
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          resetPostState();
          router.push("/component/post");
        }}
      >
        신규 등록
      </button>
      {currentItems.length > 0 &&
        currentItems.map((item) => {
          return (
            <Title key={item.id} post={{ id: item.id, post: item.post }} />
          );
        })}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) =>
          setItemOffset((event.selected * itemsPerPage) % posts.length)
        }
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
