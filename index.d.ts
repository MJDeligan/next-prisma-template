import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      loginByGoogleApi(): Chainable<any>;
    }
  }
}

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: string };
  }
  interface User extends DefaultUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
