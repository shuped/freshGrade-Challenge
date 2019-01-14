import knex from 'knex';
import * as settings from './settings.js';

export default knex({
  client: 'pg',
  connection: 'postgres://freshgradeuser:password@localhost:5432/freshgradechallenge'
  // connection: settings
});