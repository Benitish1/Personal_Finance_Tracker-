import { mockUsers } from "./mockData";

export const loginWithUsername = async (username) => {
  const normalizedUsername = username.trim().toLowerCase();
  return mockUsers.filter((user) => user.username.toLowerCase() === normalizedUsername);
};
