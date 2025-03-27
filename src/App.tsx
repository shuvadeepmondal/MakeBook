import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import ProfilePage from "./pages/ProfilePage"
import AccountPage from "./pages/AccountPage"
import { ThemeProvider } from "./components/ThemeProvider"
import Dashboard from "./components/dashboard"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

