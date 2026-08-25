import { profile } from '../content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
        </span>
        <span>Android · IoT · Automotive · Sports</span>
      </div>
    </footer>
  )
}
