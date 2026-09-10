import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home-page">

      <nav className="home-navbar">
        <div className="home-logo">
          Let's Track<span>.</span>
        </div>

        <div className="home-nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <main>

        {/* HERO SECTION */}

        <section className="hero-section">

          <div className="hero-content">

            <p className="hero-label">
              PR CAMPAIGN MANAGEMENT PLATFORM
            </p>

            <h1>
              Make every
              <br />
              <span>campaign</span> count.
            </h1>

            <p className="hero-description">
              Let's Track helps PR teams organize campaigns,
              manage media relationships, and monitor coverage
              from one simple workspace.
            </p>

            <div className="hero-buttons">
              <Link to="/dashboard" className="primary-button">
                Get Started →
              </Link>

              <a href="#features" className="secondary-button">
                Explore Features
              </a>
            </div>

          </div>

          <div className="hero-visual">

            <div className="hero-circle">
              <div className="circle-text">
                PR
              </div>
            </div>

            <div className="floating-card campaign-floating">
              <span>CAMPAIGNS</span>
              <strong>24</strong>
              <small>Active campaigns</small>
            </div>

            <div className="floating-card coverage-floating">
              <span>MEDIA COVERAGE</span>
              <strong>86%</strong>
              <small>Positive coverage</small>
            </div>

          </div>

        </section>


        {/* CLIENT / TRUST SECTION */}

        <section className="client-section">

          <p>BUILT FOR MODERN PR TEAMS</p>

          <div className="client-logos">
            <span>MEDIA</span>
            <span>PRESS</span>
            <span>PUBLIC RELATIONS</span>
            <span>BRAND</span>
            <span>COMMUNICATIONS</span>
          </div>

        </section>


        {/* FEATURES */}

        <section className="features-section" id="features">

          <div className="section-heading">

            <p className="section-label">
              WHAT YOU CAN DO
            </p>

            <h2>
              Everything your PR workflow
              <br />
              needs <em>in one place.</em>
            </h2>

          </div>

          <div className="feature-grid">

            <div className="feature-card blue-card">

              <div className="feature-number">
                01
              </div>

              <h3>
                Campaign
                <br />
                Management
              </h3>

              <p>
                Create, organize and track PR campaigns
                from planning to completion.
              </p>

              <Link to="/campaigns">
                Explore Campaigns →
              </Link>

            </div>


            <div className="feature-card">

              <div className="feature-number">
                02
              </div>

              <h3>
                Media
                <br />
                Contacts
              </h3>

              <p>
                Keep journalists, publications and
                media relationships organized.
              </p>

              <Link to="/media-contacts">
                Manage Contacts →
              </Link>

            </div>


            <div className="feature-card">

              <div className="feature-number">
                03
              </div>

              <h3>
                Media
                <br />
                Coverage
              </h3>

              <p>
                Track published stories, sentiment,
                links and campaign coverage.
              </p>

              <Link to="/media-coverage">
                Track Coverage →
              </Link>

            </div>

          </div>

        </section>


        {/* ABOUT */}

        <section className="about-section" id="about">

          <div className="about-left">

            <p className="section-label">
              WHY LET'S TRACK
            </p>

            <h2>
              From scattered
              <br />
              information to
              <br />
              <em>clear results.</em>
            </h2>

          </div>

          <div className="about-right">

            <p>
              PR campaigns involve countless details,
              from campaign timelines and media contacts
              to published coverage.
            </p>

            <p>
              Let's Track brings these workflows together
              in one focused workspace so teams can spend
              less time managing information and more time
              building meaningful media relationships.
            </p>

            <Link to="/dashboard" className="dark-button">
              Open Dashboard →
            </Link>

          </div>

        </section>


        {/* CTA */}

        <section className="cta-section">

          <p className="section-label">
            READY TO GET ORGANIZED?
          </p>

          <h2>
            Let's make your next
            <br />
            campaign <em>count.</em>
          </h2>

          <Link to="/dashboard" className="cta-button">
            Start Tracking →
          </Link>

        </section>

      </main>


      {/* FOOTER */}

      <footer className="home-footer">

        <div className="home-logo">
          Let's Track<span>.</span>
        </div>

        <p>
          PR Campaign Tracker
        </p>

        <p>
          © 2026 Let's Track
        </p>

      </footer>

    </div>
  )
}

export default Home