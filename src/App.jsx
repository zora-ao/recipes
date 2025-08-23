import { createRoutesFromElements, Route, RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Recipe from "./pages/Recipe"
import Favorites from "./pages/Favorites"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} /> 
      <Route path="/recipe/:id" element={< Recipe/>} />
      <Route path="/favorites" element={<Favorites />} />
    </>
  ), {
    basename: "/"
  }
)

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
