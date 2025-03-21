// App.jsx
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BackgroundImage from "@/assets/Rectangle.png";
import { useNavigate } from "react-router-dom";
import { checkAuth, login } from "@/lib/auth";
import { Header } from "@/components/header";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const { isAuthenticated } = await checkAuth();
      if (isAuthenticated) {
        navigate("/dashboard");
      }
    };

    verifyAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(
        result.message || "Login failed. Please check your credentials."
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-1">
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <div className="w-12 h-12 bg-blue-700 rounded-lg grid place-items-center mb-6">
                <div className="grid grid-cols-2 grid-rows-2 gap-1">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </div>
              <h1 className="text-3xl font-bold">Get Started</h1>
              <p className="text-gray-500 mt-2">
                Welcome back to PriceDrops, let's start saving money.
              </p>
            </div>

            <div className="h-px bg-gray-200 my-8"></div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="janedoe@acme.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-700">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                New to PriceDrops?
                <a
                  href="/sign-up"
                  className="font-semibold text-blue-700 hover:text-blue-800 ml-1"
                >
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Background Image */}
        <div
          className="hidden lg:block lg:w-1/2 relative"
          style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex flex-col text-white p-16">
            <div className="text-left space-y-2">
              <h2 className="text-5xl font-light italic justify-start">
                Compare.
              </h2>
              <h2 className="text-5xl font-light italic ml-24">Track.</h2>
              <h2 className="text-5xl font-light italic ml-48">Save.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
