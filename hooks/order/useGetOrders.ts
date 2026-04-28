"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/actions/order";

const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

export default useGetOrders;
