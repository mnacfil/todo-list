import Sidebar from "@/components/layout/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppLayout = async ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="h-screen w-full flex">
        <div className="w-[300px] h-screen bg-orange-50/50 hidden lg:block p-4">
          <Sidebar />
        </div>
        <div className="flex-1 mx-auto max-w-screen-lg h-full py-10 px-14">
          {children}
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default AppLayout;
