import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Footer } from "@/components/Footer";

export function DocsLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="docs" />
      <div className="flex-1 container flex">
        <DocsSidebar />
        <main className="flex-1 min-w-0 py-8 px-6 lg:px-12">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
