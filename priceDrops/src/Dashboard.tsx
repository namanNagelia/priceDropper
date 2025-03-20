import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { checkAuth, logout } from "@/lib/auth";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const verifyAuth = async () => {
      const { isAuthenticated, user } = await checkAuth();

      if (isAuthenticated && user) {
        setUser(user);
      } else {
        // Not authenticated, redirect to login
        navigate("/");
      }

      setLoading(false);
    };

    verifyAuth();
  }, [navigate]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.email}</p>
        </div>
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tracked Products</h2>
          <p className="text-gray-600">You have 0 products being tracked</p>
          <Button className="mt-4 bg-blue-700 hover:bg-blue-800">
            Add Product
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Price Drops</h2>
          <p className="text-gray-600">No recent price drops</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Savings</h2>
          <p className="text-3xl font-bold text-green-600">$0.00</p>
        </div>
      </div>
    </div>
  );
}
