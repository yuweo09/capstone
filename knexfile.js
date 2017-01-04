'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/brand_site_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/brand_site_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
