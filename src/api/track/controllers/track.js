'use strict';

/**
 * track controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { sanitize } = require('@strapi/utils');

module.exports = createCoreController('api::track.track', ({ strapi }) => ({
  async create(ctx) {
    const unparsed = require("koa-body/unparsed.js");
    const body = ctx.request.body;
    const unparsedBody = JSON.parse(ctx.request.body[unparsed]);
    unparsedBody.dt = new Date(unparsedBody.tst * 1000).toISOString();
    const entity = await strapi.entityService.create('api::track.track', {
      data: unparsedBody, 
    });
    const sanitizedEntity = await sanitize.contentAPI.output(entity);
    return { data: sanitizedEntity };
  },
}));
