"use client";

import { useGetUsersQuery } from "@/redux/services/userApi";
import {
  decrement,
  increment,
  reset,
} from "@/redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Dashboard from "./dashboard/dashboard";
import RootLayout from "./layout";
import { useEffect } from "react";
import { Router } from "next/router";
import { Box } from "@mui/material";

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  return (
    <Box>
      <Dashboard />
    </Box>
  );
}
