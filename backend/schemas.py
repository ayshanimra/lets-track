from datetime import date
from pydantic import BaseModel, model_validator, EmailStr, Field


class CampaignCreate(BaseModel):
    name: str = Field(min_length=1)
    client_name: str
    objective: str
    start_date: date
    end_date: date
    status: str = "Draft"

    @model_validator(mode="after")
    def validate_dates(self):
        if self.end_date < self.start_date:
            raise ValueError("End date cannot be earlier than start date.")
        return self

class CampaignResponse(CampaignCreate):
    id: int

    class Config:
        from_attributes = True


class MediaContactCreate(BaseModel):
    name: str
    publication: str
    email: EmailStr
    beat: str
    status: str = "Active"


class MediaContactResponse(MediaContactCreate):
    id: int

    class Config:
        from_attributes = True

class MediaCoverageCreate(BaseModel):
    publication: str
    article_title: str
    url: str
    coverage_date: date
    sentiment: str = "Neutral"
    campaign_id: int


class MediaCoverageResponse(MediaCoverageCreate):
    id: int

    class Config:
        from_attributes = True