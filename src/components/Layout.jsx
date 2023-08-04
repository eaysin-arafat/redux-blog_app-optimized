import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <main className="p-10 h-screen w-screen">
      <Outlet />
    </main>
  );
};
