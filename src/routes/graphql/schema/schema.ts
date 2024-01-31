import { Prisma } from '@prisma/client';
import { graphql, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString } from 'graphql';
import { GraphQLObjectType } from 'graphql';
import { MemberTypeId } from '../types/memberTypeId.js';
import { GraphqlContext } from '../types/types.js';
import { UUIDType } from '../types/uuid.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLInt },
    // posts: {type: new GraphQLList(PostType)},
  })
})

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt }
  })
})

export const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLInt },
    postsLimitPerMonth: { type: GraphQLInt }
  })
})

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    post: {
      type: PostType,
      args: { id: { type: UUIDType } },
      resolve(parent, args, context: GraphqlContext) {
        return context.prisma.post.findUnique({
          where: { id: args.id || undefined }
        })
        //code to get data from db or other source
        // prisma.post.findUnique()
      }
    },
    user: {
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve(parent, args, context: GraphqlContext) {
        return context.prisma.user.findUnique({
          where: { id: args.id || undefined }
        })
        //code to get data from db or other source
        // prisma.post.findUnique()
      }
    },
    member: {
      type: MemberType,
      args: { id: { type: MemberTypeId } },
      resolve(parent, args, context: GraphqlContext) {
        return context.prisma.memberType.findUnique({
          where: { id: args.id || undefined }
        })
        //code to get data from db or other source
        // prisma.post.findUnique()
      }
    },
    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
      resolve(parent, args, context: GraphqlContext) {
        return context.prisma.profile.findUnique({
          where: { id: args.id || undefined }
        })
        //code to get data from db or other source
        // prisma.post.findUnique()
      }
    }

  }
})

//корневой запрос и его подзапросы
export const schema = new GraphQLSchema({
  query: RootQuery
})

