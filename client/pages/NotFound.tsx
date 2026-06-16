import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-50">
      <div className="text-center">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-2xl font-semibold mb-4">Page Not Found</p>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-smooth"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
