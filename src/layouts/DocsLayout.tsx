import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ReadingProgress } from "@/components/ReadingProgress";
import { useScrollToHash, useScrollToTop } from "@/hooks/useScrollBehavior";

export function DocsLayout() {
  useScrollToHash();
  useScrollToTop();

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="docs" />
      <ReadingProgress />
      <div className="flex-1 container flex">
        <DocsSidebar />
        <main className="flex-1 min-w-0 py-8 px-6 lg:px-12">
          <Outlet />
        </main>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
