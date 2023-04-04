import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/Match.model';
import { mockModelMatchGetAll, mockNewMatch, mockResponseMatch, mockRouteResponseMatchGetAll, mockSendMatchInvalid, mockSendMatchInvalid2, mockSendMatchValid } from './mocks/Matches.mocks'
import { mockScore, tokenMock } from './mocks/Users.mocks';
import Team from '../database/models/Team.model';
import { teamsFindAllInvalid, teamsFindAllValid } from './mocks/Teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /match', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(mockModelMatchGetAll as Match[]);
    sinon
      .stub(Match, 'findByPk')
      .resolves(mockModelMatchGetAll[0] as Match);
    sinon
      .stub(Match, 'update')
      .resolves([1]);  
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
    (Match.findByPk as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
  })

  it('Testando rota get /matches', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');    
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockRouteResponseMatchGetAll);
  });

  it('Testando rota patch /matches/:id/finish', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', tokenMock);
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' });
  });

  it('Testando rota patch /matches/:id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .send(mockScore)
      .set('Authorization', tokenMock);
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockScore);
  });
});

describe('Testando rota /match', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(mockModelMatchGetAll as Match[]);
    sinon
      .stub(Match, 'findByPk')
      .resolves(mockModelMatchGetAll[0] as Match);
    sinon
      .stub(Match, 'update')
      .resolves([1]);
    sinon
      .stub(Match, 'create')
      .resolves(mockNewMatch as Match);    
    sinon
      .stub(Team, 'findAll')
      .onFirstCall()
      .resolves(teamsFindAllValid as Team[])
      .onSecondCall()
      .resolves(teamsFindAllInvalid as Team[])
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
    (Match.findByPk as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
    (Match.create as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Testando rota get /matches', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');    
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockRouteResponseMatchGetAll);
  });

  it('Testando rota patch /matches/:id/finish', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', tokenMock);
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' });
  });

  it('Testando rota patch /matches/:id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .send(mockScore)
      .set('Authorization', tokenMock);
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockScore);
  });

  it('Testando rota post /matches', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(mockSendMatchValid)
      .set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockResponseMatch);
  })

  it('Testando rota post /matches ao passar dois ids com valores iguais', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(mockSendMatchInvalid)
      .set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  })
  it('Testando rota post /matches ao passar um id de um time inexistente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send(mockSendMatchInvalid2)
      .set('Authorization', tokenMock);

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'There is no team with such id!' });
  })
});
