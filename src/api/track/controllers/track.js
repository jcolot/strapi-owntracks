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
    const unparsedBody = ctx.request.body[unparsed];
    const entity = await strapi.entityService.create('api::track.track', {
      data: JSON.parse(unparsedBody), 
    });
    const sanitizedEntity = await sanitize.contentAPI.output(entity);
    return { data: sanitizedEntity };
  },
}));
