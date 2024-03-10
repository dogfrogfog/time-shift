import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "~lib/api"

import Header from "./Header"
import Main from "./main"

export default function MainLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
    </QueryClientProvider>
  )
}
