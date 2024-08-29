import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
function App() {
  return (
    <main>
      <Toaster />
      <Outlet />
    </main>
  )
}

export default App
