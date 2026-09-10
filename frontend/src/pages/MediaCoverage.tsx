import { useEffect, useState } from "react"
import axios from "axios"

type MediaCoverage = {
  id: number
  publication: string
  article_title: string
  url: string
  coverage_date: string
  sentiment: string
  campaign_id: number
}

function MediaCoverage() {
  const [coverage, setCoverage] = useState<MediaCoverage[]>([])
  const [search, setSearch] = useState("")

  const [publication, setPublication] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  const [url, setUrl] = useState("")
  const [coverageDate, setCoverageDate] = useState("")
  const [sentiment, setSentiment] = useState("Neutral")
  const [campaignId, setCampaignId] = useState("")

  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/media-coverage")
      .then((response) => {
        setCoverage(response.data)
      })
      .catch((error) => {
        console.error("Error fetching media coverage:", error)
      })
  }, [])

  const clearForm = () => {
    setPublication("")
    setArticleTitle("")
    setUrl("")
    setCoverageDate("")
    setSentiment("Neutral")
    setCampaignId("")
    setEditingId(null)
  }

  const handleSaveCoverage = () => {
    if (
      !publication ||
      !articleTitle ||
      !url ||
      !coverageDate ||
      !campaignId
    ) {
      alert("Please fill in all fields.")
      return
    }

    const coverageData = {
      publication,
      article_title: articleTitle,
      url,
      coverage_date: coverageDate,
      sentiment,
      campaign_id: Number(campaignId)
    }

    if (editingId !== null) {
      axios
        .put(
          `http://127.0.0.1:8000/media-coverage/${editingId}`,
          coverageData
        )
        .then((response) => {
          setCoverage(
            coverage.map((item) =>
              item.id === editingId ? response.data : item
            )
          )

          clearForm()
        })
        .catch((error) => {
          console.error("Error updating media coverage:", error)
          alert("Failed to update media coverage.")
        })

      return
    }

    axios
      .post(
        "http://127.0.0.1:8000/media-coverage",
        coverageData
      )
      .then((response) => {
        setCoverage([...coverage, response.data])
        clearForm()
      })
      .catch((error) => {
        console.error("Error adding media coverage:", error)
        alert("Failed to add media coverage.")
      })
  }

  const handleEditCoverage = (item: MediaCoverage) => {
    setEditingId(item.id)
    setPublication(item.publication)
    setArticleTitle(item.article_title)
    setUrl(item.url)
    setCoverageDate(item.coverage_date)
    setSentiment(item.sentiment)
    setCampaignId(String(item.campaign_id))
  }

  const handleDeleteCoverage = (coverageId: number) => {
    axios
      .delete(
        `http://127.0.0.1:8000/media-coverage/${coverageId}`
      )
      .then(() => {
        setCoverage(
          coverage.filter((item) => item.id !== coverageId)
        )

        if (editingId === coverageId) {
          clearForm()
        }
      })
      .catch((error) => {
        console.error("Error deleting media coverage:", error)
        alert("Failed to delete media coverage.")
      })
  }

  return (
    <div className="page">
      <h1>Media Coverage</h1>

      <p>
        Track media coverage received for your PR campaigns.
      </p>

      <div className="form-card">
        <h2>
          {editingId !== null
            ? "Edit Media Coverage"
            : "Add Media Coverage"}
        </h2>

        <input
          type="text"
          placeholder="Publication"
          value={publication}
          onChange={(e) => setPublication(e.target.value)}
        />

        <input
          type="text"
          placeholder="Article Title"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />

        <input
          type="url"
          placeholder="Article URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label>Coverage Date</label>

        <input
          type="date"
          value={coverageDate}
          onChange={(e) => setCoverageDate(e.target.value)}
        />

        <label>Sentiment</label>

        <select
          value={sentiment}
          onChange={(e) => setSentiment(e.target.value)}
        >
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
        </select>

        <input
          type="number"
          placeholder="Campaign ID"
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
        />

        <button onClick={handleSaveCoverage}>
          {editingId !== null
            ? "Update Media Coverage"
            : "Add Media Coverage"}
        </button>

        {editingId !== null && (
          <button onClick={clearForm}>
            Cancel
          </button>
        )}
      </div>
<input
  type="text"
  placeholder="Search media coverage..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      <div className="campaign-list">
        {coverage
  .filter((item) =>
    item.article_title.toLowerCase().includes(search.toLowerCase()) ||
    item.publication.toLowerCase().includes(search.toLowerCase())
  )
  .map((item) => (
          <div className="campaign-card" key={item.id}>
            <h2>{item.article_title}</h2>

            <p>
              <strong>Publication:</strong>{" "}
              {item.publication}
            </p>

            <p>
              <strong>Coverage Date:</strong>{" "}
              {item.coverage_date}
            </p>

            <p>
              <strong>Sentiment:</strong>{" "}
              {item.sentiment}
            </p>

            <p>
              <strong>Campaign ID:</strong>{" "}
              {item.campaign_id}
            </p>

            <p>
              <strong>Article:</strong>{" "}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Article
              </a>
            </p>

            <button
              onClick={() => handleEditCoverage(item)}
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteCoverage(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MediaCoverage