from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_get_campaigns():
    response = client.get("/campaigns")

    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_campaign():
    response = client.post(
        "/campaigns",
        json={
            "name": "Test Campaign",
            "client_name": "Test Client",
            "objective": "Test campaign objective",
            "start_date": "2026-10-01",
            "end_date": "2026-10-10",
            "status": "Draft"
        }
    )

    assert response.status_code == 200
    assert response.json()["name"] == "Test Campaign"
def test_delete_campaign():
    create_response = client.post(
        "/campaigns",
        json={
            "name": "Delete Test Campaign",
            "client_name": "Test Client",
            "objective": "Testing delete",
            "start_date": "2026-11-01",
            "end_date": "2026-11-05",
            "status": "Draft"
        }
    )

    campaign_id = create_response.json()["id"]

    delete_response = client.delete(
        f"/campaigns/{campaign_id}"
    )

    assert delete_response.status_code == 200
def test_update_campaign():
    create_response = client.post(
        "/campaigns",
        json={
            "name": "Update Test Campaign",
            "client_name": "Test Client",
            "objective": "Testing update",
            "start_date": "2026-12-01",
            "end_date": "2026-12-05",
            "status": "Draft"
        }
    )

    campaign_id = create_response.json()["id"]

    update_response = client.put(
        f"/campaigns/{campaign_id}",
        json={
            "name": "Updated Campaign",
            "client_name": "Updated Client",
            "objective": "Updated objective",
            "start_date": "2026-12-01",
            "end_date": "2026-12-05",
            "status": "Active"
        }
    )

    assert update_response.status_code == 200
    assert update_response.json()["name"] == "Updated Campaign"
def test_dashboard():
    response = client.get("/dashboard")

    assert response.status_code == 200

    data = response.json()

    assert "total_campaigns" in data
    assert "active_campaigns" in data
    assert "completed_campaigns" in data
    assert "total_media_contacts" in data
    assert "total_media_coverage" in data

def test_invalid_campaign_dates():
    response = client.post(
        "/campaigns",
        json={
            "name": "Invalid Date Test",
            "client_name": "Test Client",
            "objective": "Testing date validation",
            "start_date": "2026-12-10",
            "end_date": "2026-12-01",
            "status": "Draft"
        }
    )

    assert response.status_code == 422

def test_invalid_email():
    response = client.post(
        "/media-contacts",
        json={
            "name": "Invalid Contact",
            "publication": "Test Publication",
            "email": "not-an-email",
            "beat": "Technology",
            "status": "Active"
        }
    )

    assert response.status_code == 422
def test_empty_campaign_name():
    response = client.post(
        "/campaigns",
        json={
            "name": "",
            "client_name": "Test Client",
            "objective": "Testing empty name",
            "start_date": "2026-12-01",
            "end_date": "2026-12-05",
            "status": "Draft"
        }
    )

    assert response.status_code == 422