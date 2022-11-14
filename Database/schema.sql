USE dragonbot;

CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY
);

CREATE TABLE GuildWelcome (
    guildId VARCHAR(100) NOT NULL,
    FOREIGN KEY (guildId) REFERENCES Guilds(guildId),
    channelId VARCHAR(100) NOT NULL,
    message TEXT(100) NOT NULL
);

CREATE TABLE GuildLogsChannel (
    guildId VARCHAR(100) NOT NULL,
    channelId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildReport (
    guildId VARCHAR(100) NOT NULL,
    channelId VARCHAR(100) NOT NULL,
    MemberID VARCHAR(100) NOT NULL,
    TicketID VARCHAR(100) NOT NULL,
    Closed BOOLEAN,
    Locked BOOLEAN,
    TicketType VARCHAR(100) NOT NULL
);

CREATE TABLE GuildTicket (
    guildId VARCHAR(100) NOT NULL,
    channelId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL,
    FOREIGN KEY (guildId) REFERENCES Guilds(guildId)
);

CREATE TABLE Warnings (
    infractionID INTEGER(100) NOT NULL,
    guildId VARCHAR(100) NOT NULL,
    userID VARCHAR(100) NOT NULL,
    staffID VARCHAR(100) NOT NULL,
    reason TEXT(100) NOT NULL
);

CREATE TABLE Test (
    guildId VARCHAR(100) NOT NULL,
    userID TEXT(100) NOT NULL,
    userName TEXT(100) NOT NULL
)