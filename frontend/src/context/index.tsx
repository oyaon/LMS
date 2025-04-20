import { createContext } from 'react';

// Define user roles
export const UserRoles = {
  ADMIN: 'Admin',
  LIBRARIAN: 'Librarian',
  MEMBER: 'Member',
};

// Create a context for user roles
export const UserRoleContext = createContext(UserRoles.MEMBER);

// Placeholder for context directory
// Export all context providers here