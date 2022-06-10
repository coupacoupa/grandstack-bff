import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  ### TYPES ###
  type Department {
    name: String! @unique
    users: [User!]!
      @relationship(type: "BELONGS_TO", properties: "BelongsTo", direction: IN)
  }

  type User
    @auth(
      rules: [
        { isAuthenticated: true }
        { operations: [READ], allow: { oneBankId: "$jwt.sub" } }
        { operations: [CREATE, READ, UPDATE, DELETE] }
      ]
    ) {
    oneBankId: String! @unique
    department: [Department!]!
      @relationship(type: "BELONGS_TO", propertie s: "BelongsTo", direction: OUT)
    isSuperAdmin: Boolean @default(value: false)
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

  ## RELATIONSHIPS ##
  interface BelongsTo @relationshipProperties {
    canCreateExperiment: Boolean @default(value: false)
    canUpdateExperiment: Boolean @default(value: false)
    canDeleteExperiment: Boolean @default(value: false)
    canExecuteExperiment: Boolean @default(value: false)
    canDownloadReport: Boolean @default(value: false)
    canAssignRoles: Boolean @default(value: false)
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
