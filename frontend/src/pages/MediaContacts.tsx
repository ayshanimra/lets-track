import { useEffect, useState } from "react"
import axios from "axios"

type MediaContact = {
  id: number
  name: string
  publication: string
  email: string
  beat: string
  status: string
}

function MediaContacts() {
  const [contacts, setContacts] = useState<MediaContact[]>([])
  const [search, setSearch] = useState("")

  const [name, setName] = useState("")
  const [publication, setPublication] = useState("")
  const [email, setEmail] = useState("")
  const [beat, setBeat] = useState("")
  const [status, setStatus] = useState("Active")

  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    axios
      .get("https://lets-track-fmpz.onrender.com/media-contacts")
      .then((response) => {
        setContacts(response.data)
      })
      .catch((error) => {
        console.error("Error fetching media contacts:", error)
      })
  }, [])

  const clearForm = () => {
    setName("")
    setPublication("")
    setEmail("")
    setBeat("")
    setStatus("Active")
    setEditingId(null)
  }

  const handleAddContact = () => {
    if (!name || !publication || !email || !beat) {
      alert("Please fill in all fields.")
      return
    }

    if (editingId !== null) {
      axios
        .put(`https://lets-track-fmpz.onrender.com/media-contacts/${editingId}`, {
          name,
          publication,
          email,
          beat,
          status
        })
        .then((response) => {
          setContacts(
            contacts.map((contact) =>
              contact.id === editingId ? response.data : contact
            )
          )

          clearForm()
        })
        .catch((error) => {
          console.error("Error updating media contact:", error)
          alert("Failed to update media contact.")
        })

      return
    }

    axios
      .post("https://lets-track-fmpz.onrender.com/media-contacts", {
        name,
        publication,
        email,
        beat,
        status
      })
      .then((response) => {
        setContacts([...contacts, response.data])
        clearForm()
      })
      .catch((error) => {
        console.error("Error adding media contact:", error)
        alert("Failed to add media contact.")
      })
  }

  const handleEditContact = (contact: MediaContact) => {
    setEditingId(contact.id)
    setName(contact.name)
    setPublication(contact.publication)
    setEmail(contact.email)
    setBeat(contact.beat)
    setStatus(contact.status)
  }

  const handleDeleteContact = (contactId: number) => {
    axios
      .delete(`https://lets-track-fmpz.onrender.com/media-contacts/${contactId}`)
      .then(() => {
        setContacts(
          contacts.filter((contact) => contact.id !== contactId)
        )

        if (editingId === contactId) {
          clearForm()
        }
      })
      .catch((error) => {
        console.error("Error deleting media contact:", error)
        alert("Failed to delete media contact.")
      })
  }

  return (
    <div className="page">
      <h1>Media Contacts</h1>
      <p>Manage your media contacts here.</p>

      <div className="form-card">
        <h2>
          {editingId !== null
            ? "Edit Media Contact"
            : "Add Media Contact"}
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Publication"
          value={publication}
          onChange={(e) => setPublication(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Beat / Category"
          value={beat}
          onChange={(e) => setBeat(e.target.value)}
        />

        <label>Status</label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button onClick={handleAddContact}>
          {editingId !== null
            ? "Update Media Contact"
            : "Add Media Contact"}
        </button>

        {editingId !== null && (
          <button onClick={clearForm}>
            Cancel
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search media contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="campaign-list">
        {contacts
          .filter(
            (contact) =>
              contact.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              contact.publication
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((contact) => (
            <div className="campaign-card" key={contact.id}>
              <h2>{contact.name}</h2>

              <p>
                <strong>Publication:</strong> {contact.publication}
              </p>

              <p>
                <strong>Email:</strong> {contact.email}
              </p>

              <p>
                <strong>Beat:</strong> {contact.beat}
              </p>

              <p>
                <strong>Status:</strong> {contact.status}
              </p>

              <button onClick={() => handleEditContact(contact)}>
                Edit
              </button>

              <button onClick={() => handleDeleteContact(contact.id)}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MediaContacts