# People API Cencosud

## Overview

This project uses NestJS with TypeORM and PostgreSQL. It includes Docker configurations for a PostgreSQL database and the necessary setup to run the application.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for running the NestJS project)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BenjaminNassW/prueba_tecnica_cencosud
cd prueba_tecnica_cencosud
npm install
```

## Set Up Docker

### Start Docker

Make sure Docker and Docker Compose are installed and running on your machine.

- Build and Run Docker Containers
- Navigate to the project directory and run:

```bash
docker-compose build
docker-compose up -d
```

## Start the Application

### Run the NestJS application:

```bash
npm run start:dev
```

## Endpoints
```
type Query {
  findAll: [Group!]!
  findOne(id: Int!): Group
  findAllProfiles: [Profile!]!
  findOneProfile(id: Int!): Profile
  findAllComments: [Comment!]!
  findOneComment(id: Int!): Comment
}

type Mutation {
  createUser(createUserInput: CreateUserInput!): User!
  updateUser(updateUserInput: UpdateUserInput!): User!
  removeUser(id: Int!): DeleteUserGQL!
  createProfile(createProfileInput: CreateProfileInput!): Profile!
  updateProfile(updateProfileInput: UpdateProfileInput!): Profile!
  removeProfile(id: Int!): DeleteGQL!
  createPost(createPostInput: CreatePostInput!): Post!
  updatePost(updatePostInput: UpdatePostInput!): Post!
  removePost(id: Int!): DeleteGQL!
  createGroup(createGroupInput: CreateGroupInput!): Group!
  updateGroup(updateGroupInput: UpdateGroupInput!): Group!
  removeGroup(id: Int!): DeleteGQL!
  createComment(createCommentInput: CreateCommentInput!): Comment!
  updateComment(updateCommentInput: UpdateCommentInput!): Comment!
  removeComment(id: Int!): DeleteGQL!
}
```

Posibles mejoras:
- Testing
- Agregar la capa de Repositorio para manejo de bases de datos
