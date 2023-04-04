import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';
import User from '../database/models/User.model';

import { Response } from 'superagent';
import { IUserLogin } from '../api/interfaces/User/IUser';
import { mockModelUserLogin, tokenMock } from './mocks/Users.mocks';
import * as JWT from 'jsonwebtoken';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(mockModelUserLogin as User);
    sinon
      .stub(JWT, 'sign')
      .resolves(tokenMock)
    sinon
      .stub(JWT, 'verify')
      .resolves()
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
    (JWT.sign as sinon.SinonStub).restore();
    (JWT.verify as sinon.SinonStub).restore();
  })

  it('Testando rota post /login', async () => {
    const infoLogin: IUserLogin = { email: 'admin@admin.com', password: 'secret_admin' }
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(infoLogin);
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ token: tokenMock })
  });

  it('Testando rota post /login/role', async () => {
    const infoLogin: IUserLogin = { email: 'admin@admin.com', password: 'secret_admin' }
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', tokenMock);
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' })
  });
});

describe('Testando rota /login erros', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(undefined);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Testando rota post /login', async () => {
    const infoLogin: IUserLogin = { email: 'test@test.com', password: 'secret_test' }
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(infoLogin);
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })
  });
});
