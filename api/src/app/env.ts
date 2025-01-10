export class Env {
   static get debug() {
      return Bun.env["DEBUG"] == "true";
   }
}
