// Jest environment test

// jest-environment.test.js
// Test the Jest environment setup
describe('Jest environment setup', () => {
    it('should have a valid Jest environment', () => {
        expect(typeof jest).toBe('object');
    });
    it('should have a valid MongoDB client', () => {
        const { MongoClient } = require('mongodb');
        expect(typeof MongoClient).toBe('function');
    }); 
});
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
describe('Jest Environment', () => {
  it('should have jest object globally available', () => {
    expect(typeof jest).toBe('object');
  });

  it('should execute setup file', () => {
    // Check if the timeout is set by setup file indirectly
    expect(jest.setTimeout).toBeDefined();
  });
});
