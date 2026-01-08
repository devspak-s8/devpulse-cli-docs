import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted mx-auto mb-6">
          <Terminal className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Page not found. The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/docs">
              View Documentation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
