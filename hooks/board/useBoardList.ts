import { useEffect, useState } from "react";
import axios from "axios";
import { BoardItemType } from "@/types";

type Props = {
  boardId: number;
  type?: "NORMAL" | "ANNOUNCEMENT" | "RECRUITMENT";
  order?: "recent" | "popular";
  page: number;
};

function useBoardList({
  boardId,
  type = "NORMAL",
  page,
  order = "popular",
}: Props) {
  const [boardList, setBoardList] = useState<BoardItemType[] | null>(null);
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}boards/${boardId}/posts`,
        {
          params: {
            type,
            page,
            order,
            size: 20,
          },
        },
      );
      // const { data } = await boardApis.getBoardList(
      //   boardId,
      //   type,
      //   page,
      //   order,
      //   5,
      // );
      // setBoardList(data.data.posts);
      const newBoardList: BoardItemType[] = data?.posts?.map((el: any) => ({
        id: el.postId,
        title: el?.title ?? "제목 없음",
        description: el?.main ?? "본문 없음",
        views: el?.viewCount ?? 0,
        image: el?.thumbnailUrl ?? "",
        imageAlt: el?.thumbnailUrl ? "thumbnail" : null,
        likes: el?.likeCount,
        comments: el?.commentCount,
        createdAt: el.createdAt,
      }));
      setBoardList(data.posts);
    })();
  }, [type, order, boardId, page]);
  return boardList;
}

export default useBoardList;
