import { useEffect, useState } from "react"
import axios from "axios"
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Home from "./pages/Home"
import Campaigns from "./pages/Campaigns"
import MediaContacts from "./pages/MediaContacts"
import MediaCoverage from "./pages/MediaCoverage"

type Campaign = {
  id: number
  name: string
  client_name: string
  objective: string
  start_date: string
  end_date: string
  status: string
}

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    total_campaigns: 0,
    active_campaigns: 0,
    completed_campaigns: 0,
    total_media_contacts: 0,
    total_media_coverage: 0
  })

  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  const [coverage, setCoverage] = useState<{
    id: number
    publication: string
    article_title: string
    url: string
    coverage_date: string
    sentiment: string
    campaign_id: number
  }[]>([])

  useEffect(() => {

    axios
      .get("https://lets-track-fmpz.onrender.com/dashboard")
      .then((response) => {
        setDashboard(response.data)
      })
      .catch((error) => {
        console.error(
          "Error fetching dashboard:",
          error
        )
      })

    axios
      .get("https://lets-track-fmpz.onrender.com/campaigns")
      .then((response) => {
        setCampaigns(response.data)
      })
      .catch((error) => {
        console.error(
          "Error fetching campaigns:",
          error
        )
      })

    axios
      .get("https://lets-track-fmpz.onrender.com/media-coverage")
      .then((response) => {
        setCoverage(response.data)
      })
      .catch((error) => {
        console.error(
          "Error fetching media coverage:",
          error
        )
      })

  }, [])


  return (
    <>

      <div className="header">

        <div>
          <p className="dashboard-label">
            OVERVIEW
          </p>

          <h1>Dashboard</h1>

          <p>
            Your PR activity at a glance.
          </p>
        </div>

        <Link
          to="/campaigns"
          className="dashboard-action"
        >
          + New Campaign
        </Link>

      </div>


      <div className="cards">

        <div className="card">
          <h3>Total Campaigns</h3>
          <p>{dashboard.total_campaigns}</p>
        </div>

        <div className="card">
          <h3>Active Campaigns</h3>
          <p>{dashboard.active_campaigns}</p>
        </div>

        <div className="card">
          <h3>Completed Campaigns</h3>
          <p>{dashboard.completed_campaigns}</p>
        </div>

        <div className="card">
          <h3>Media Contacts</h3>
          <p>{dashboard.total_media_contacts}</p>
        </div>

        <div className="card">
          <h3>Media Coverage</h3>
          <p>{dashboard.total_media_coverage}</p>
        </div>

      </div>


      <div className="recent-section">

        <div className="section-top">

          <div>
            <p className="dashboard-label">
              ACTIVITY
            </p>

            <h2>Recent Campaigns</h2>
          </div>

          <Link to="/campaigns">
            View all →
          </Link>

        </div>


        {campaigns.length === 0 ? (

          <p>No campaigns available.</p>

        ) : (

          <div className="recent-list">

            {campaigns
              .slice(-5)
              .reverse()
              .map((campaign) => (

                <div
                  className="recent-card"
                  key={campaign.id}
                >

                  <div>
                    <h3>
                      {campaign.name}
                    </h3>

                    <p>
                      {campaign.client_name}
                    </p>
                  </div>

                  <div className="recent-details">

                    <span>
                      {campaign.start_date}
                    </span>

                    <span>→</span>

                    <span>
                      {campaign.end_date}
                    </span>

                    <strong>
                      {campaign.status}
                    </strong>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>


      <div className="recent-section">

        <div className="section-top">

          <div>
            <p className="dashboard-label">
              MEDIA
            </p>

            <h2>Recent Media Coverage</h2>
          </div>

          <Link to="/media-coverage">
            View all →
          </Link>

        </div>

        {coverage.length === 0 ? (

          <p>No media coverage available.</p>

        ) : (

          <div className="recent-list">

            {coverage
              .slice(-5)
              .reverse()
              .map((item) => (

                <div
                  className="recent-card"
                  key={item.id}
                >

                  <div>
                    <h3>{item.article_title}</h3>

                    <p>{item.publication}</p>
                  </div>

                  <div className="recent-details">

                    <span>
                      {item.coverage_date}
                    </span>

                    <strong>
                      {item.sentiment}
                    </strong>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>

    </>
  )
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LANDING PAGE */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* DASHBOARD + APP */}

        <Route
          path="/dashboard"
          element={
            <div className="dashboard">

              <nav className="navbar">

                <Link
                  to="/"
                  className="logo"
                >
                  Let's Track
                </Link>

                <div className="nav-links">

                  <Link to="/dashboard">
                    Dashboard
                  </Link>

                  <Link to="/campaigns">
                    Campaigns
                  </Link>

                  <Link to="/media-contacts">
                    Media Contacts
                  </Link>

                  <Link to="/media-coverage">
                    Media Coverage
                  </Link>

                </div>

              </nav>

              <Dashboard />

            </div>
          }
        />


        <Route
          path="/campaigns"
          element={
            <div className="dashboard">

              <nav className="navbar">

                <Link
                  to="/"
                  className="logo"
                >
                  Let's Track
                </Link>

                <div className="nav-links">

                  <Link to="/dashboard">
                    Dashboard
                  </Link>

                  <Link to="/campaigns">
                    Campaigns
                  </Link>

                  <Link to="/media-contacts">
                    Media Contacts
                  </Link>

                  <Link to="/media-coverage">
                    Media Coverage
                  </Link>

                </div>

              </nav>

              <Campaigns />

            </div>
          }
        />


        <Route
          path="/media-contacts"
          element={
            <div className="dashboard">

              <nav className="navbar">

                <Link
                  to="/"
                  className="logo"
                >
                  Let's Track
                </Link>

                <div className="nav-links">

                  <Link to="/dashboard">
                    Dashboard
                  </Link>

                  <Link to="/campaigns">
                    Campaigns
                  </Link>

                  <Link to="/media-contacts">
                    Media Contacts
                  </Link>

                  <Link to="/media-coverage">
                    Media Coverage
                  </Link>

                </div>

              </nav>

              <MediaContacts />

            </div>
          }
        />


        <Route
          path="/media-coverage"
          element={
            <div className="dashboard">

              <nav className="navbar">

                <Link
                  to="/"
                  className="logo"
                >
                  Let's Track
                </Link>

                <div className="nav-links">

                  <Link to="/dashboard">
                    Dashboard
                  </Link>

                  <Link to="/campaigns">
                    Campaigns
                  </Link>

                  <Link to="/media-contacts">
                    Media Contacts
                  </Link>

                  <Link to="/media-coverage">
                    Media Coverage
                  </Link>

                </div>

              </nav>

              <MediaCoverage />

            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App