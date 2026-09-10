import { useEffect, useState } from "react"
import axios from "axios"

type Campaign = {
  id: number
  name: string
  client_name: string
  objective: string
  start_date: string
  end_date: string
  status: string
}

function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [search, setSearch] = useState("")

  const [name, setName] = useState("")
  const [clientName, setClientName] = useState("")
  const [objective, setObjective] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [status, setStatus] = useState("Draft")
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    axios
      .get("https://lets-track-fmpz.onrender.com/campaigns")
      .then((response) => {
        setCampaigns(response.data)
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error)
      })
  }, [])

  const handleAddCampaign = () => {
    if (!name || !clientName || !objective || !startDate || !endDate) {
      alert("Please fill in all fields.")
      return
    }

    if (endDate < startDate) {
      alert("End date cannot be earlier than start date.")
      return
    }

    if (editingId !== null) {
      axios
        .put(`https://lets-track-fmpz.onrender.com/campaigns/${editingId}`, {
          name,
          client_name: clientName,
          objective,
          start_date: startDate,
          end_date: endDate,
          status
        })
        .then((response) => {
          setCampaigns(
            campaigns.map((campaign) =>
              campaign.id === editingId ? response.data : campaign
            )
          )

          setEditingId(null)
          setName("")
          setClientName("")
          setObjective("")
          setStartDate("")
          setEndDate("")
          setStatus("Draft")
        })
        .catch((error) => {
          console.error("Error updating campaign:", error)
          alert("Failed to update campaign.")
        })

      return
    }

    axios
      .post("https://lets-track-fmpz.onrender.com/campaigns", {
        name,
        client_name: clientName,
        objective,
        start_date: startDate,
        end_date: endDate,
        status
      })
      .then((response) => {
        setCampaigns([...campaigns, response.data])

        setName("")
        setClientName("")
        setObjective("")
        setStartDate("")
        setEndDate("")
        setStatus("Draft")
      })
      .catch((error) => {
        console.error("Error adding campaign:", error)
        alert("Failed to add campaign.")
      })
  }

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingId(campaign.id)
    setName(campaign.name)
    setClientName(campaign.client_name)
    setObjective(campaign.objective)
    setStartDate(campaign.start_date)
    setEndDate(campaign.end_date)
    setStatus(campaign.status)
  }

  const handleDeleteCampaign = (campaignId: number) => {
    axios
      .delete(`https://lets-track-fmpz.onrender.com/campaigns/${campaignId}`)
      .then(() => {
        setCampaigns(
          campaigns.filter((campaign) => campaign.id !== campaignId)
        )
      })
      .catch((error) => {
        console.error("Error deleting campaign:", error)
        alert("Failed to delete campaign.")
      })
  }

  return (
    <div className="page">
      <h1>Campaigns</h1>
      <p>Manage your PR campaigns here.</p>

      <div className="form-card">
        <h2>Add Campaign</h2>

        <input
          type="text"
          placeholder="Campaign Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
        />

        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Draft">Draft</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={handleAddCampaign}>
          {editingId !== null ? "Update Campaign" : "Add Campaign"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search campaigns..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="campaign-list">
        {campaigns
          .filter(
            (campaign) =>
              campaign.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              campaign.client_name
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((campaign) => (
            <div className="campaign-card" key={campaign.id}>
              <h2>{campaign.name}</h2>

              <p>
                <strong>Client:</strong> {campaign.client_name}
              </p>

              <p>
                <strong>Objective:</strong> {campaign.objective}
              </p>

              <p>
                <strong>Start Date:</strong> {campaign.start_date}
              </p>

              <p>
                <strong>End Date:</strong> {campaign.end_date}
              </p>

              <p>
                <strong>Status:</strong> {campaign.status}
              </p>

              <button onClick={() => handleEditCampaign(campaign)}>
                Edit
              </button>

              <button onClick={() => handleDeleteCampaign(campaign.id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Campaigns