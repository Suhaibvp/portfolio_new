import { useEffect, useState } from 'react'
import { profile } from '../content'
import { useTheme } from '../hooks'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export function Nav({ scrolled }: { scrolled: boolean }) {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="brand">
            <span className="brand-mark">SV</span>
            {profile.firstName} {profile.lastName}
          </a>
          <nav className="nav-links" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <a className="chip-btn" href={profile.resumeUrl} download>
              Resume
            </a>
            <button
              className="icon-btn"
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M3.2 12.8l1.1-1.1M11.7 4.3l1.1-1.1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M13.2 10.2A5.4 5.4 0 1 1 5.8 2.8 4.3 4.3 0 0 0 13.2 10.2Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <button
              className="icon-btn menu-btn"
              type="button"
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="mobile-panel">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
