import NotFound from '../errors/NotFound';
import ILeaderboard from '../interfaces/Leaderboard/ILeaderboard';
import calculatePoints, { calculateSucessRate } from './manipulateLeaderBoard';

const updateTeam = (teamHome: ILeaderboard, teamAway: ILeaderboard) => {
  const totalVictories = teamHome.totalVictories + teamAway.totalVictories;
  const totalDraws = teamHome.totalDraws + teamAway.totalDraws;
  const goalsFavor = teamHome.goalsFavor + teamAway.goalsFavor;
  const goalsOwn = teamHome.goalsOwn + teamAway.goalsOwn;
  const totalGames = teamHome.totalGames + teamAway.totalGames;
  const totalLosses = teamHome.totalLosses + teamAway.totalLosses;
  const totalPoints = calculatePoints(totalVictories, totalDraws);
  const efficiency = calculateSucessRate(totalPoints, totalGames);
  const goalsBalance = goalsFavor - goalsOwn;

  return { totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency };
};

const concentrateTeams = (teamsHome: ILeaderboard[], teamsAway: ILeaderboard[]): ILeaderboard[] => {
  const allTeams = teamsHome.reduce((teams: ILeaderboard[], team: ILeaderboard) => {
    const teamsNames = teamsAway.map(({ name }) => name);
    if (teamsNames.includes(team.name)) {
      const teamAway = teamsAway.find((t) => t.name === team.name);
      if (!teamAway) throw new NotFound('Team not found');
      const teamUpdated = updateTeam(team, teamAway);
      teams.push({ name: team.name, ...teamUpdated });
    } else {
      teams.push(team);
    }
    return teams;
  }, []);

  return allTeams;
};

export default concentrateTeams;
