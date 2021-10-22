// Sobreescrever uma tipagem do TypeScript

declare namespace Express {
  export interface Request {
    userId: string;
  }
}
