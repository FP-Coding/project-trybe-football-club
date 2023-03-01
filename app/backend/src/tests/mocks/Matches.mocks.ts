import { INewMatch, IResponseMatchGetAll } from "../../api/interfaces/Matches/IMatches"

export const mockModelMatchGetAll: IResponseMatchGetAll[] = [
  { 
    dataValues: {
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: { dataValues: { teamName: 'Vasco'} },
    awayTeam: { dataValues: { teamName: 'Flamengo'} },
  }
},
  { dataValues: {
    homeTeamId: 2,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: { dataValues: { teamName: 'Flamengo'} },
    awayTeam: { dataValues: { teamName: 'Vasco'} },
  }},
]

export const mockRouteResponseMatchGetAll = mockModelMatchGetAll
.map(
  ({
    dataValues: {
      homeTeam: { dataValues: homeTeam },
      awayTeam: { dataValues: awayTeam },
      ...infoMatches
    },
  }: IResponseMatchGetAll) => ({ ...infoMatches, homeTeam, awayTeam }))

export const mockSendMatchValid = {
  awayTeamGoals: 1,
  awayTeamId: 1,
  homeTeamGoals: 2,
  homeTeamId: 2,
}

export const mockSendMatchInvalid = {
  awayTeamGoals: 1,
  awayTeamId: 1,
  homeTeamGoals: 2,
  homeTeamId: 1,
}

export const mockSendMatchInvalid2 = {
  awayTeamGoals: 1,
  awayTeamId: 1,
  homeTeamGoals: 2,
  homeTeamId: 100,
}

export const mockNewMatch = {
  dataValues: {
    id: 1,
    awayTeamGoals: 1,
    awayTeamId: 1,
    homeTeamGoals: 2,
    homeTeamId: 2,
    inProgress: true,
  }
} 

export const mockResponseMatch = mockNewMatch.dataValues;

