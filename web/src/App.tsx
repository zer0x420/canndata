// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import StrainList from "./pages/strains/strain-list"
import StrainDetail from "./pages/strains/strain-detail"
import ProductList from "./pages/products/product-list"
import ReportList from "./pages/reports/report-list"
import ReportDetail from "./pages/reports/report-detail"
import ProductDetail from "./pages/products/product-detail"

const App = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-grow flex justify-center p-4 w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/strains" replace />} />
          <Route path="/strains">
            <Route index element={<StrainList />} />  
            <Route path=":id" element={<StrainDetail />} />
          </Route>
          <Route path="/products">
            <Route index element={<ProductList />} />  
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/reports">
            <Route index element={<ReportList />} />  
            <Route path=":id" element={<ReportDetail />} />
          </Route>

          <Route path="*" element={<div className="p-6">Page not found</div>} />
        </Routes>
      </main>
      <footer className="p-4 border-t text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} – CannData<br />
        <a
          href="https://creativecommons.org/licenses/by-nc/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline hover:text-primary"
        >
          <img
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
            alt="Creative Commons"
            className="w-4 h-4 inline"
          />
          CC BY-NC 4.0
        </a>
      </footer>

    </div>
  )
}

export default App
