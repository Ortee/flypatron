import request from 'superagent';
import httpStatus from 'http-status';
import { expect } from 'chai';
import sinon from 'sinon';
import Airport from '../../lib/models/airport';
const URL = process.env.URL || 'localhost:3000';

require('sinon-mongoose');
require('sinon-as-promised');

describe('Airports request ', () => {
  it('### GET /airports helper', (done) => {
    done();
  });
});
