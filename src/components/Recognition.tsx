import { education, recognition } from '../content'
import { Reveal } from './Reveal'

export function Recognition() {
  return (
    <section id="recognition">
      <div className="wrap">
        <Reveal>
        <p className="section-kicker">Proof</p>
        <h2 className="section-title">When the work went live in the arena.</h2>
        </Reveal>
        <div className="recognition">
          <article className="quote-card">
            <p className="eyebrow">{recognition.title}</p>
            <blockquote>{recognition.body}</blockquote>
            <cite>{recognition.org}</cite>
          </article>
          <article className="edu-card">
            <p className="section-kicker">Education</p>
            <h3>{education.degree}</h3>
            <p>
              {education.school}
              <br />
              {education.place}
              <br />
              {education.period}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
