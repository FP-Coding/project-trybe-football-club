import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import * as JWT from 'jsonwebtoken';
import { leaderboardGetAll, leaderboardGetAllAway, leaderboardGetAllHome } from './mocks/Leaderboard.mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /leaderboard', () => {
  let chaiHttpResponse: Response;

  it('Testando rota post /leaderboard/home', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardGetAllHome)

  });

  it('Testando rota post /leaderboard/away', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardGetAllAway)
  });

  it('Testando rota post /leaderboard', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardGetAll);
  });
});