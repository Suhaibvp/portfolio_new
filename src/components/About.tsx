import {
  certifications,
  interests,
  profile,
  spokenLanguages,
  testimonials,
} from '../content'
import { Reveal } from './Reveal'

export function About() {
  const socials = profile.socials.filter((s) => s.href)

  return (
    <section id="about">
      <div className="wrap split">
        <div className="portrait">
          {profile.photo ? (
            <img src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} />
          ) : (
            <div className="portrait-fallback">
              <span className="monogram">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </span>
            </div>
          )}
          <div className="portrait-slot">
            <strong>
              {profile.firstName} {profile.lastName}
            </strong>
            <span>
              {profile.location} · {profile.availability}
            </span>
          </div>
        </div>
        <div className="about-copy">
          <Reveal>
          <p className="section-kicker">About</p>
          <h2 className="section-title">Built for hardware that has to behave.</h2>
          </Reveal>
          <p className="lead">{profile.tagline}</p>
          <p>
            {profile.years} years in Kotlin and Java, shipping MVVM apps with Coroutines, Compose,
            BLE, GPS, Room, and Firebase. Most of the work sits at the messy edge — phones talking
            to devices, cameras, and live events — where clean architecture is what keeps the
            product alive.
          </p>
          {profile.extraAbout ? <p>{profile.extraAbout}</p> : null}
          {spokenLanguages.length > 0 && (
            <p>Languages: {spokenLanguages.join(' · ')}</p>
          )}
          {interests.length > 0 && <p>Beyond the IDE: {interests.join(' · ')}</p>}
          <div className="chips">
            {socials.map((s) => (
              <a className="chip" key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <div className="stats">
            {profile.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {(certifications.length > 0 || testimonials.length > 0) && (
        <div className="wrap" style={{ marginTop: '2.5rem' }}>
          <div className="optional-grid">
            {certifications.map((c) => (
              <article className="skill-card" key={c.name}>
                <h3>Certification</h3>
                <p>
                  <strong>{c.name}</strong>
                  <br />
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ''}
                </p>
              </article>
            ))}
            {testimonials.map((t) => (
              <article className="skill-card" key={t.name}>
                <h3>Note</h3>
                <p>“{t.quote}”</p>
                <p>
                  {t.name} · {t.role}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
