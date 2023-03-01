import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import * as JWT from 'jsonwebtoken';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /leaderboard', () => {
  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Leaderboard, 'findOne')
  //     .resolves( as User);
  // });

  // after(()=>{
  //   (Leaderboard. as sinon.SinonStub).restore();
  // })

  it('Testando rota post /leaderboard/home', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.be.deep.equal()
  });

  it('Testando rota post /leaderboard/away', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.be.deep.equal()
  });

  it('Testando rota post /leaderboard', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.be.deep.equal()
  });
});