import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';
import Team from '../database/models/Team.model';

import { Response } from 'superagent';
import { mockModelTeamGetById, mockModelTeamsGetAll, mockRouteResponseGetAll, mockRouteResponseGetById } from './mocks/Teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /team', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, 'findAll')
      .resolves(mockModelTeamsGetAll as Team[]);
    sinon
      .stub(Team, 'findByPk')
      .resolves(mockModelTeamGetById as Team)
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Testando rota get /team', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockRouteResponseGetAll)
  });

  it('Testando rota get /team/:id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/5');
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(mockRouteResponseGetById)
  });
});
