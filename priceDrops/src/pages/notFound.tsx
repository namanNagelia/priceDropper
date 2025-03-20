// NotFound.jsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-blue-700 rounded-lg grid place-items-center mb-6 mx-auto">
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-3 h-3 bg-white rounded-sm"></div>
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold">404</h1>
          <p className="text-gray-500 mt-2 text-lg">Oops! Page not found.</p>
          <p className="text-gray-500 mt-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-blue-700 hover:bg-blue-800"
          >
            Return to Home
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full"
          >
            Go Back
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help?
            <a
              href="/support"
              className="font-semibold text-blue-700 hover:text-blue-800 ml-1"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
