import Team from "../../database/models/Team.model";

const teams = [
  {
    team_name: 'Avaí/Kindermann',
  },
  {
    team_name: 'Bahia',
  },
  {
    team_name: 'Botafogo',
  },
  {
    team_name: 'Corinthians',
  },
  {
    team_name: 'Cruzeiro',
  },
  {
    team_name: 'Ferroviária',
  },
  {
    team_name: 'Flamengo',
  },
  {
    team_name: 'Grêmio',
  },
  {
    team_name: 'Internacional',
  },
  {
    team_name: 'Minas Brasília',
  },
  {
    team_name: 'Napoli-SC',
  },
  {
    team_name: 'Palmeiras',
  },
  {
    team_name: 'Real Brasília',
  },
  {
    team_name: 'Santos',
  },
  {
    team_name: 'São José-SP',
  },
  {
    team_name: 'São Paulo',
  },
]

let id = 1;
export const mockModelTeamsGetAll = teams.map(({ team_name }) => {
  return new Team({ id: id++, teamName:team_name  })
})

export const mockRouteResponseGetAll = mockModelTeamsGetAll.map(({ dataValues }) => {
  return dataValues
})

export const mockModelTeamGetById = new Team({ id: 5, TeamName: 'Cruzeiro' });

export const mockRouteResponseGetById = mockModelTeamGetById.dataValues;

export const teamsFindAllValid = [
  {
    id: 1,
    teamName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    teamName: 'Flamengo',
  }
]

export const teamsFindAllInvalid = [
  {
    id: 1,
    teamName: 'Avaí/Kindermann',
  }
]