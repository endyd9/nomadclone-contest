import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import Login from "./route/login";
import Home from "./route/home";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Join from "./route/join";
import WritePeed from "./route/writePeed";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/write",
        element: <WritePeed />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join",
    element: <Join />,
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="w-screen h-[90vh] lg:h-screen bg-black text-white overflow-y-scroll overflow-x-hidden">
      {!isLoading && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
