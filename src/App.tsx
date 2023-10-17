import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import Login from "./route/login";
import Home from "./route/home";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Join from "./route/join";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
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
    <div className="w-screen h-[90vh] lg:h-[100vh] bg-black text-white ">
      {!isLoading && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
