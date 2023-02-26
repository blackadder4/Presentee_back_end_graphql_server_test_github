const { buildSchema } = require('graphql');
const express = require('express');
const app = express();
//const expressGraphQL = require('express-graphql');
const expressGraphQL = require('express-graphql').graphqlHTTP

const schema = buildSchema(`
input AMPLIFY {
  globalAuthRule: AuthRule = { allow: public }
}

type Presentation @model {
  id: ID! @index
  Access: [String!]!
  dtype: String!
  createdAt: String!
  numViews: Int!
  byUser: User @belongsTo(fields: ["Userid"])
  Userid: ID!
  Data: PresentationData! @hasOne(fields: ["id"])
}

type User @model {
  Userid: ID! @primaryKey
  Ownership: [Presentation!]! @hasMany(fields: ["Userid"])
  createdAt: String!
  is_premium: Boolean!
}

type PresentationData @model {
  id: ID! 
  Title: String!
  S3_Path: String!
  owner: Presentation @belongsTo
}

type Survey @model {
  id: ID! @primaryKey #normal primary key to link votes to survey
  SurveyID: ID!
  Multi: Boolean!
  text: String!
  Possible_answer: [String!]!
  votes: [Vote] @hasMany(fields: ["SurveyID"])
}

type Vote @model{
  id: ID! @primaryKey
  SurveyID: ID!
  survey: Survey @belongsTo(fields: ["SurveyID"])
  _vote: String!
}

type Question @model {
  id: ID! @primaryKey #normal primary key to link answer to question
  questionID: ID!
  text: String!
  answer: [Response] @hasMany(fields: ["questionID"])
}

type Response @model{
  id: ID! @primaryKey
  questionID: ID!
  question: Question @belongsTo(fields: ["questionID"])
  Responseid: String!
  text: String!
}

type Session @model {
  id: ID!
  control: User! @hasOne(fields: ["id"])
  participants: [User!]! @hasMany(fields: ["id"])
  presentation_data: PresentationData! @hasOne(fields: ["id"])
  Page_number: String!
  Active_surveys: [Survey!]! @hasMany(fields: ["id"])
  Active_questions: [Question!]! @hasMany(fields: ["id"])
}

`);

module.exports = schema;
