module.exports = {
  preset: '@shelf/jest-mongodb', // Use the Jest MongoDB preset
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Ensure the setup file is correctly referenced
};

// jest-environment.js
const NodeEnvironment = require('jest-environment-node');
const MongoClient = require('mongodb').MongoClient;
const { MongoMemoryServer } = require('mongodb-memory-server-core');
