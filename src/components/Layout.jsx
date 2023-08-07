import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <main className="p-10 h-screen w-screen">
      <Header />
      <Outlet />
    </main>
  );
};
