import ILeaderboard from '../interfaces/Leaderboard/ILeaderboard';

const calculatePoints = (victories: number, draws: number): number => (victories * 3) + (draws * 1);

export const calculateSucessRate = (
  points: number,
  quantityGames: number,
): string => ((points / (quantityGames * 3)) * 100).toFixed(2);

export const orderByVictories = (teams: ILeaderboard[]) => {
  const ordered = teams.sort((
    { totalVictories: totalVictoriesA }: ILeaderboard,
    { totalVictories: totalVictoriesB }: ILeaderboard,
  ) => totalVictoriesB - totalVictoriesA);
  return [...ordered];
};

export const orderByGoalsBalance = (teams: ILeaderboard[]) => {
  const ordered = teams.sort((
    { goalsBalance: goalsBalanceA }: ILeaderboard,
    { goalsBalance: goalsBalanceB }: ILeaderboard,
  ) => goalsBalanceB - goalsBalanceA);
  return [...ordered];
};

export const orderByGoalsFavor = (teams: ILeaderboard[]) => {
  const ordered = teams.sort((
    { goalsFavor: goalsFavorA }: ILeaderboard,
    { goalsFavor: goalsFavorB }: ILeaderboard,
  ) => goalsFavorB - goalsFavorA);
  return [...ordered];
};

export const orderByGoalsOwn = (teams: ILeaderboard[]) => {
  const ordered = teams.sort((
    { goalsOwn: goalsOwnA }: ILeaderboard,
    { goalsOwn: goalsOwnB }: ILeaderboard,
  ) => goalsOwnA - goalsOwnB);
  return [...ordered];
};

export const orderLeaderboard = (teams: ILeaderboard[]) => {
  const orderedByGoalsOwn = orderByGoalsOwn(teams);
  const orderedByGoalsFavor = orderByGoalsFavor(orderedByGoalsOwn);
  const orderedByGoalsBalance = orderByGoalsBalance(orderedByGoalsFavor);
  const orderedByVictories = orderByVictories(orderedByGoalsBalance);

  return orderedByVictories;
};

export default calculatePoints;
