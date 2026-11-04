import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Navigate } from './components/SiteLink'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Docs from './pages/Docs'
import About from './pages/About'
import Faq from './pages/Faq'
import Contributing from './pages/Contributing'
import Privacy from './pages/Privacy'
import Changelog from './pages/Changelog'
import NotFound from './pages/NotFound'

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
    else if (!pathname.startsWith('/docs')) window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded bg-accent px-3 py-2 text-[#04101c] focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Skip to content</a>
      <Navbar />
      <ScrollToHash />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contributing" element={<Contributing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
          <Route path="/docs/:slug" element={<Docs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}
