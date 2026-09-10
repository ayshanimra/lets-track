from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from models import Campaign, MediaContact, MediaCoverage
from schemas import (
    CampaignCreate,
    CampaignResponse,
    MediaContactCreate,
    MediaContactResponse,
    MediaCoverageCreate,
    MediaCoverageResponse
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Let's Track API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://lets-track-ten.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Let's Track API is running!"}


@app.post("/campaigns", response_model=CampaignResponse)
def create_campaign(campaign: CampaignCreate, db: Session = Depends(get_db)):
    new_campaign = Campaign(
        name=campaign.name,
        client_name=campaign.client_name,
        objective=campaign.objective,
        start_date=campaign.start_date,
        end_date=campaign.end_date,
        status=campaign.status
    )

    db.add(new_campaign)
    db.commit()
    db.refresh(new_campaign)

    return new_campaign


@app.get("/campaigns", response_model=list[CampaignResponse])
def get_campaigns(db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).all()
    return campaigns


@app.get("/campaigns/{campaign_id}", response_model=CampaignResponse)
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        return {"detail": "Campaign not found"}

    return campaign


@app.put("/campaigns/{campaign_id}", response_model=CampaignResponse)
def update_campaign(
    campaign_id: int,
    campaign_data: CampaignCreate,
    db: Session = Depends(get_db)
):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        return {"detail": "Campaign not found"}

    campaign.name = campaign_data.name
    campaign.client_name = campaign_data.client_name
    campaign.objective = campaign_data.objective
    campaign.start_date = campaign_data.start_date
    campaign.end_date = campaign_data.end_date
    campaign.status = campaign_data.status

    db.commit()
    db.refresh(campaign)

    return campaign


@app.delete("/campaigns/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(
            status_code=404,
            detail="Campaign not found"
        )

    db.delete(campaign)
    db.commit()

    return {"message": "Campaign deleted successfully"}


@app.post("/media-contacts", response_model=MediaContactResponse)
def create_media_contact(
    contact: MediaContactCreate,
    db: Session = Depends(get_db)
):
    new_contact = MediaContact(
        name=contact.name,
        publication=contact.publication,
        email=contact.email,
        beat=contact.beat,
        status=contact.status
    )

    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)

    return new_contact


@app.get("/media-contacts", response_model=list[MediaContactResponse])
def get_media_contacts(db: Session = Depends(get_db)):
    contacts = db.query(MediaContact).all()
    return contacts


@app.get("/media-contacts/{contact_id}", response_model=MediaContactResponse)
def get_media_contact(
    contact_id: int,
    db: Session = Depends(get_db)
):
    contact = db.query(MediaContact).filter(
        MediaContact.id == contact_id
    ).first()

    if not contact:
        raise HTTPException(
            status_code=404,
            detail="Media contact not found"
        )

    return contact


@app.put("/media-contacts/{contact_id}", response_model=MediaContactResponse)
def update_media_contact(
    contact_id: int,
    contact_data: MediaContactCreate,
    db: Session = Depends(get_db)
):
    contact = db.query(MediaContact).filter(
        MediaContact.id == contact_id
    ).first()

    if not contact:
        raise HTTPException(
            status_code=404,
            detail="Media contact not found"
        )

    contact.name = contact_data.name
    contact.publication = contact_data.publication
    contact.email = contact_data.email
    contact.beat = contact_data.beat
    contact.status = contact_data.status

    db.commit()
    db.refresh(contact)

    return contact


@app.delete("/media-contacts/{contact_id}")
def delete_media_contact(
    contact_id: int,
    db: Session = Depends(get_db)
):
    contact = db.query(MediaContact).filter(
        MediaContact.id == contact_id
    ).first()

    if not contact:
        raise HTTPException(
            status_code=404,
            detail="Media contact not found"
        )

    db.delete(contact)
    db.commit()

    return {"message": "Media contact deleted successfully"}


@app.post("/media-coverage", response_model=MediaCoverageResponse)
def create_media_coverage(
    coverage: MediaCoverageCreate,
    db: Session = Depends(get_db)
):
    new_coverage = MediaCoverage(
        publication=coverage.publication,
        article_title=coverage.article_title,
        url=coverage.url,
        coverage_date=coverage.coverage_date,
        sentiment=coverage.sentiment,
        campaign_id=coverage.campaign_id
    )

    db.add(new_coverage)
    db.commit()
    db.refresh(new_coverage)

    return new_coverage


@app.get("/media-coverage", response_model=list[MediaCoverageResponse])
def get_media_coverage(db: Session = Depends(get_db)):
    coverage = db.query(MediaCoverage).all()
    return coverage


@app.get("/media-coverage/{coverage_id}", response_model=MediaCoverageResponse)
def get_media_coverage_item(
    coverage_id: int,
    db: Session = Depends(get_db)
):
    coverage = db.query(MediaCoverage).filter(
        MediaCoverage.id == coverage_id
    ).first()

    if not coverage:
        raise HTTPException(
            status_code=404,
            detail="Media coverage not found"
        )

    return coverage


@app.put("/media-coverage/{coverage_id}", response_model=MediaCoverageResponse)
def update_media_coverage(
    coverage_id: int,
    coverage_data: MediaCoverageCreate,
    db: Session = Depends(get_db)
):
    coverage = db.query(MediaCoverage).filter(
        MediaCoverage.id == coverage_id
    ).first()

    if not coverage:
        raise HTTPException(
            status_code=404,
            detail="Media coverage not found"
        )

    coverage.publication = coverage_data.publication
    coverage.article_title = coverage_data.article_title
    coverage.url = coverage_data.url
    coverage.coverage_date = coverage_data.coverage_date
    coverage.sentiment = coverage_data.sentiment
    coverage.campaign_id = coverage_data.campaign_id

    db.commit()
    db.refresh(coverage)

    return coverage


@app.delete("/media-coverage/{coverage_id}")
def delete_media_coverage(
    coverage_id: int,
    db: Session = Depends(get_db)
):
    coverage = db.query(MediaCoverage).filter(
        MediaCoverage.id == coverage_id
    ).first()

    if not coverage:
        raise HTTPException(
            status_code=404,
            detail="Media coverage not found"
        )

    db.delete(coverage)
    db.commit()

    return {"message": "Media coverage deleted successfully"}


@app.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    total_campaigns = db.query(Campaign).count()
    active_campaigns = db.query(Campaign).filter(
        Campaign.status == "Active"
    ).count()
    completed_campaigns = db.query(Campaign).filter(
        Campaign.status == "Completed"
    ).count()
    total_contacts = db.query(MediaContact).count()
    total_coverage = db.query(MediaCoverage).count()

    return {
        "total_campaigns": total_campaigns,
        "active_campaigns": active_campaigns,
        "completed_campaigns": completed_campaigns,
        "total_media_contacts": total_contacts,
        "total_media_coverage": total_coverage
    }