import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  activeId?: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20">
        <h4 className="text-sm font-semibold mb-4">On this page</h4>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "block text-sm py-1 transition-colors border-l-2 -ml-px",
                item.level === 2 ? "pl-3" : "pl-6",
                activeId === item.id
                  ? "text-primary border-primary font-medium"
                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-muted-foreground/50"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
