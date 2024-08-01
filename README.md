# People API Cencosud

 
## Description
Posibles mejoras:
- Testing
- Agregar la capa de Repositorio para manejo de bases de datos
- Crear seeders
- POR FAVOR DEJENME ENTRAR!!!

## Installation

Instalar: 
- node
- postgres (configurar credenciales)
  
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

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
