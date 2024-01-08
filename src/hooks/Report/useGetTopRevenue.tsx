import { useMutation, useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetTopRevenue = async (time: string) => {
  const { data: top3, error: top3error } = await supabase
    .rpc("get_billl", { name: time }) //tai dat bien ben query la name, luoi doi

    .range(0, 2)

    .order("total", { ascending: false });
  if (top3error) {
    throw new Error(top3error.message);
  }

  const { data: top10, error: top10error } = await supabase
    .rpc("get_billl", { name: time })

    .range(0, 9)
    .order("total", { ascending: false });
  if (top10error) {
    throw new Error(top10error.message);
  }

  const { data: top1, error: top1error } = await supabase
    .rpc("get_billl", { name: time })

    .range(0, 0)
    .order("total", { ascending: false });
  if (top1error) {
    throw new Error(top1error.message);
  }

  return { top3, top10, top1 };
};

export default function useGetTopRevenue(time: string) {
  return useQuery("topbill" + time, () => GetTopRevenue(time));
}
