import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginByGoogleApi(): Chainable<any>;
  }
}

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string; role: string };
  }
  interface User extends DefaultUser {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
