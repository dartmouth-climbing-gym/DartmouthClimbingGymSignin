/**
 * src/types/index.ts
 *
 * Type definitions for the Dartmouth Climbing Gym website.
 */

export type ClimberSession = {
  id: string;
  netid: string;
  signin: number;
  signout: number;
};

export type Waiver = {
  id: string;
  name: string;
  category: "netID" | "email";
};
