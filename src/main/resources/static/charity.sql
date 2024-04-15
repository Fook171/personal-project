CREATE TABLE FundraisingCampaign (
    campaignId INT PRIMARY KEY,
    campaignNameVN NVARCHAR(50),
    campaignNameEN VARCHAR(50),
    campaignPoster NVARCHAR(50),
    adder NVARCHAR(50),
    descriptionVN NTEXT,
    descriptionEN TEXT, 
    -- descriptionVN NVARCHAR(MAX),
    -- descriptionEN VARCHAR(MAX), 
    startingDate DATETIME, 
    endingDate DATETIME, 
    targetFund MONEY, 
    currentFund MONEY,
    FOREIGN KEY (adder) REFERENCES Account(email)
);
CREATE TABLE Account (
    email NVARCHAR(50) PRIMARY KEY, 
    password NVARCHAR(100), 
    avatar NVARCHAR(100),
    role BIT,
    name NVARCHAR(50),
    dateOfBirth DATE
);
CREATE TABLE DonationHistory (
    donationId INT PRIMARY KEY, 
    email NVARCHAR(50), 
    campaignId INT, 
    donationAmount MONEY, 
    donationDate MONEY,
    timeStamp DATETIME,
    FOREIGN KEY (email) REFERENCES Account(email),
    FOREIGN KEY (campaignId) REFERENCES FundraisingCampaign(campaignId)
);

DROP TABLE FundraisingCampaign;
DROP TABLE Account;
DROP TABLE DonationHistory;

SELECT * FROM FundraisingCampaign;