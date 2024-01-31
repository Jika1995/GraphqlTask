import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { schema } from './schema/schema.js';
//loaders, mutations, query
const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body
      // req.body.variables schema source valuevariables
      // return await prisma.user.findMany()

      const result = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma }
      })

      return {
        data: result.data,
        errors: result.errors?.map(err => {
          message: err.message
        })
      };
    },
  });
};

export default plugin;
