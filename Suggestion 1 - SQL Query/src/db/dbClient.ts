import * as knex from 'knex';
import * as settings from './settings.js';

export default knex({
  client: 'pg',
  connection: settings
});