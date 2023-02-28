import ILeaderboard from '../interfaces/Leaderboard/ILeaderboard';

const calculatePoints = (victories: number, draws: number): number => (victories * 3) + (draws * 1);

export const calculateSucessRate = (
  points: number,
  quantityGames: number,
): string => ((points / (quantityGames * 3)) * 100).toFixed(2);

export const orderLeaderboard = (teams: ILeaderboard[]) => {
  const orderedByVictories = teams.sort((infoA: ILeaderboard, infoB: ILeaderboard) => {
    if (infoA.totalPoints !== infoB.totalPoints) {
      return infoB.totalPoints - infoA.totalPoints;
    }
    if (infoA.goalsBalance !== infoB.goalsBalance) {
      return infoB.goalsBalance - infoA.goalsBalance;
    }
    if (infoA.goalsFavor !== infoB.goalsFavor) { return infoB.goalsFavor - infoA.goalsFavor; }
    return infoA.goalsOwn - infoB.goalsOwn;
  });

  return orderedByVictories;
};

export default calculatePoints;
