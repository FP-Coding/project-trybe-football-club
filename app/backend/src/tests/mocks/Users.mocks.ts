import User from "../../database/models/User.model";

export const mockModelUserLogin = new User({
  id: 1, 
  username: 'Admin', 
  role: 'admin', 
  email: 'admin@admin.com', 
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
});

export const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjc3Njc5ODkyLCJleHAiOjE2NzgyODQ2OTJ9.PsJkvKnCH_-MAuFZ5QAWuRNr_2uuR4y9jZ3Z9mhDTls';

export const tokenDecoded = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  iat: 1677679892,
  exp: 1678284692
}

export const mockScore = { homeTeamGoals: 3, awayTeamGoals: 2 }