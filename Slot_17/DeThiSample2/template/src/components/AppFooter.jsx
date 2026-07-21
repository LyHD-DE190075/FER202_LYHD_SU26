import about from '../data/about'

function AppFooter() {
  return (
    <footer className="border-top mt-4 py-3 text-center text-muted">
      <div className="d-flex align-items-center justify-content-center gap-2">
        <img src={about.logo} alt="logo" height={28} />
        <span className="fw-bold">{about.appName}</span>
      </div>
      <div>{about.copyright}</div>
    </footer>
  )
}

export default AppFooter
