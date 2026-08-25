import { useState } from 'react'
import { experience } from '../content'
import { Reveal } from './Reveal'

export function Work() {
  const [openId, setOpenId] = useState(experience[0]?.projects[0]?.id ?? '')

  return (
    <section id="work">
      <div className="wrap">
        <Reveal>
        <p className="section-kicker">Selected work</p>
        <h2 className="section-title">Products that left the lab.</h2>
        </Reveal>
        {experience.map((role) => (
          <article className="role-block" key={role.company + role.period}>
            <div className="role-head">
              <div>
                <h3>{role.title}</h3>
                <p>
                  {role.company} · {role.location}
                </p>
              </div>
              <p className="role-period">{role.period}</p>
            </div>
            <div className="projects">
              {role.projects.map((project) => {
                const open = openId === project.id
                return (
                  <button
                    key={project.id}
                    type="button"
                    className={`project${open ? ' is-open' : ''}`}
                    onClick={() => setOpenId(open ? '' : project.id)}
                    aria-expanded={open}
                  >
                    <div className="project-top">
                      <span className={`accent accent-${project.accent}`} />
                      <div>
                        <h4>{project.name}</h4>
                        <small>{project.tag}</small>
                      </div>
                      <span className="caret" aria-hidden="true">
                        +
                      </span>
                    </div>
                    <div className="project-body">
                      <div>
                        <div className="project-body-inner">
                          <p>{project.summary}</p>
                          <ul>
                            {project.highlights.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <div className="chips">
                            {project.tech.map((t) => (
                              <span className="chip" key={t}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
