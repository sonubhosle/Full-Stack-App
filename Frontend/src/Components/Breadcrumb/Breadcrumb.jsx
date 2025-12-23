import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      className="flex flex-wrap items-center gap-2 text-sm sm:text-base pb-3 "
      aria-label="Breadcrumb"
    >
      {/* Home Link */}
      <Link
        to="/"
        className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={routeTo} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />

            {isLast ? (
              <span className="text-blue-600 font-medium capitalize truncate max-w-[120px] sm:max-w-none">
                {decodeURIComponent(value.replace(/-/g, " "))}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-gray-600 hover:text-blue-600 capitalize truncate max-w-[120px] sm:max-w-none transition-colors"
              >
                {decodeURIComponent(value.replace(/-/g, " "))}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
