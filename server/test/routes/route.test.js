import request from 'superagent';
import { expect } from 'chai';
const URL = process.env.URL || 'localhost:3000';

require('sinon-mongoose');
require('sinon-as-promised');

describe('Route request ', () => {
  it('### POST /route ', (done) => {
    request
      .post(`http://${URL}/api/route`)
      .send({
        from: 'KUL',
        to: 'SIN',
      })
      .set('Content-Type', 'application/json')
      .then( req => {
        expect(req.status).to.equal(200 || 201);
        done();
      });
  });
});
