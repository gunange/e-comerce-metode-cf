export class Env {
   static get debug() {
      return Bun.env["DEBUG"] == "true";
   }
   static get debug_sql() {
      return Bun.env["DEBUG_SQL"] == "true";
   }
}
