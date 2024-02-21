"use client";

const { atom } = require("recoil");



export const postState = atom({
  key: "PostState",
  default: {
    id: null,
    post: {
      title: "",
      content: "",
    },
  },
});

export const postListState = atom({
  key: "PostListState",
  default: [],
});
