import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

interface HeaderProps {
  showLogout?: boolean;
}

export function Header({ showLogout = false }: HeaderProps) {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoggingOut(true);
    const result = await logout();
    setLoggingOut(false);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-700 rounded-lg grid place-items-center mr-3">
          <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
            <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
            <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
          </div>
        </div>
        <div className="text-xl font-bold text-gray-800">PriceDrops</div>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <a
          href="/"
          className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
        >
          Home
        </a>
        <a
          href="/pricing"
          className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
        >
          Pricing
        </a>
        <a
          href="/support"
          className="text-gray-600 hover:text-blue-700 transition-colors font-medium"
        >
          Support
        </a>
      </nav>

      <div className="flex items-center space-x-3">
        {showLogout ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={loggingOut}
            className="border-gray-200 text-gray-700 hover:text-blue-700 hover:border-blue-700"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="border-gray-200 text-gray-700 hover:text-blue-700 hover:border-blue-700"
            >
              Sign in
            </Button>
            <Button
              size="sm"
              onClick={() => navigate("/sign-up")}
              className="bg-blue-700 hover:bg-blue-800"
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
