import { type FormEvent, useState } from 'react'
import { profile } from '../content'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

export function Contact() {
  const [sent, setSent] = useState(false)
  const socials = profile.socials.filter((s) => s.href)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    const subject = encodeURIComponent(`Portfolio note from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="wrap contact">
        <div>
          <Reveal>
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Let’s put another device in someone’s pocket.</h2>
          </Reveal>
          <p className="lede" style={{ marginTop: 0 }}>
            Open to Android roles in Bengaluru or remote. Immediate joiner — if the product talks to
            hardware, I’m already interested.
          </p>
          <div className="contact-links">
            <a className="contact-link" href={`mailto:${profile.email}`}>
              <span>Email</span>
              <strong>{profile.email}</strong>
            </a>
            <a className="contact-link" href={`tel:${profile.phoneRaw}`}>
              <span>Phone</span>
              <strong>{profile.phone}</strong>
            </a>
            <div className="contact-link">
              <span>Based in</span>
              <strong>{profile.location}</strong>
            </div>
            {socials.map((s) => (
              <a
                className="contact-link"
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{s.label}</span>
                <strong>Open ↗</strong>
              </a>
            ))}
          </div>
        </div>
        <form className="form" onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" autoComplete="name" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              required
              placeholder="Role, product, or a problem you want solved…"
            />
          </label>
          <Magnetic className="btn btn-primary" type="submit">
            {sent ? 'Opening your mail app' : 'Send a note'}
          </Magnetic>
          <p className="form-note">
            This opens your email client with the message ready. No data is stored on this site.
          </p>
        </form>
      </div>
    </section>
  )
}
