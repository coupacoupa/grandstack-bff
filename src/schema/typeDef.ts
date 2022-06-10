import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  ### TYPES ###
  type Department {
    name: String! @unique
    users: [User!]! @relationship(type: "BELONGS_TO", direction: IN)
  }

  type User {
    oneBankId: String! @unique
    department: [Department!]! @relationship(type: "BELONGS_TO", direction: OUT)
  }

  type Experiment {
    id: String!
    name: String!
    startDate: DateTime!
    endDate: DateTime!
  }

  type Variant {
    id: String!
    name: String!
    status: Status!
  }

  type Schedule {
    id: String!
    name: String!
    groupId: Int
  }

  ## INTERFACES ##
  interface Identity {
    id: String!
    name: String!
  }

  ### INPUTS ###
  input DepartmentInput {
    name: String!
  }

  ### ENUMS ###
  enum Entities {
    Department
    User
    Experiment
    Variant
  }

  enum Relations {
    OWNS
    OWNED_BY
    CREATED_BY
    CONTAINS
    BELONGS_TO
    PARENT_OF
    CHILD_OF
  }

  enum Status {
    DRAFT
    LIVE
    PAUSED
    STOPPED
    ARCHIVED
  }
`;
