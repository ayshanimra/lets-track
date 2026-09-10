from sqlalchemy import Column, Integer, String, Date
from database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    client_name = Column(String, nullable=False)
    objective = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(String, default="Draft")

class MediaContact(Base):
    __tablename__ = "media_contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    publication = Column(String, nullable=False)
    email = Column(String, nullable=False)
    beat = Column(String, nullable=False)
    status = Column(String, default="Active")

class MediaCoverage(Base):
    __tablename__ = "media_coverage"

    id = Column(Integer, primary_key=True, index=True)
    publication = Column(String, nullable=False)
    article_title = Column(String, nullable=False)
    url = Column(String, nullable=False)
    coverage_date = Column(Date, nullable=False)
    sentiment = Column(String, default="Neutral")
    campaign_id = Column(Integer, nullable=False)