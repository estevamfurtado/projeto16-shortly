-- create database
CREATE DATABASE IF NOT EXISTS "shortly";


-- create tables

CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "sessions" (
    "id" serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES "users"("id"),
    "token" text NOT NULL UNIQUE,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "isValid" boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS "urls" (
    "id" serial PRIMARY KEY,
    "baseUrl" text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL REFERENCES "users"("id"),
    "visits" int NOT NULL DEFAULT 0,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "isActive" boolean NOT NULL DEFAULT true
);