import request from 'superagent';
import httpStatus from 'http-status';
import { expect } from 'chai';
import sinon from 'sinon';
import Airport from '../../lib/models/airport';
const URL = process.env.URL || 'localhost:3000';

require('sinon-mongoose');
require('sinon-as-promised');

describe('Airports request ', () => {
  const airportMock = {
    name: 'Bamiyan',
    id: 'BIN',
    location: '67.823611, 34.804167',
    countryId: 'AF',
    cityId: 'BINA',
  };

  it('### GET /airports ', (done) => {
    request
      .get(`http://${URL}/api/airports`)
      .then((res)=>{
        expect(res.body[0].name).to.equal(airportMock.name);
        expect(res.body[0].id).to.equal(airportMock.id);
        expect(res.body[0].location).to.equal(airportMock.location);
        expect(res.body[0].countryId).to.equal(airportMock.countryId);
        expect(res.body[0].cityId).to.equal(airportMock.cityId);
        done();
      });
  });
});
