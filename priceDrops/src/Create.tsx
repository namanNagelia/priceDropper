// App.jsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BackgroundImage from "@/assets/Rectangle.png";
function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="flex h-screen w-full">
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
              Welcome to PriceDrops, let's start saving money.
            </p>
          </div>

          <div className="h-px bg-gray-200 my-8"></div>

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
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800"
              >
                Sign up
              </Button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?
              <a
                href="/sign-in"
                className="font-semibold text-blue-700 hover:text-blue-800 ml-1"
              >
                Sign in
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
  );
}

export default App;
