import { skills } from '../content'
import { Reveal } from './Reveal'

export function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal>
        <p className="section-kicker">Toolkit</p>
        <h2 className="section-title">Native first. Curious everywhere else.</h2>
        </Reveal>
        <div className="skill-grid">
          {skills.map((group) => (
            <article className="skill-card" key={group.name}>
              <h3>{group.name}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
