"use client";

import { useQuery } from "@tanstack/react-query";
import { GetUsers } from "@/lib/actions/user";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => GetUsers(),
  });
};
