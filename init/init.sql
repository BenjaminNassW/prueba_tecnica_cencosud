-- Create "user" table
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- Create "profile" table
CREATE TABLE IF NOT EXISTS "profile" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES "user"(id) ON DELETE CASCADE,
    biography TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- Create "post" table
CREATE TABLE IF NOT EXISTS "post" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- Create "comment" table
CREATE TABLE IF NOT EXISTS "comment" (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES "post"(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- Create "group" table
CREATE TABLE IF NOT EXISTS "group" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

-- Create "user_group" join table
CREATE TABLE IF NOT EXISTS "user_group" (
    user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES "group"(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, group_id)
);

-- Insert a sample user
INSERT INTO "user" ("firstName", "lastName", email, created_at) 
VALUES ('John', 'Doe', 'john.doe@example.com', NOW());

-- Insert a sample profile
INSERT INTO "profile" (user_id, biography, "dateOfBirth", created_at) 
VALUES (1, 'Sample bio', '1990-01-01', NOW());

-- Insert a sample post
INSERT INTO "post" (user_id, title, content, created_at) 
VALUES (1, 'Sample Post', 'This is a sample post content', NOW());

-- Insert a sample comment
INSERT INTO "comment" (post_id, content, created_at) 
VALUES (1, 'This is a sample comment', NOW());

-- Insert a sample group
INSERT INTO "group" (name, description, created_at) 
VALUES ('Sample Group', 'This is a sample group description', NOW());

-- Associate user with group
INSERT INTO "user_group" (user_id, group_id) 
VALUES (1, 1);
