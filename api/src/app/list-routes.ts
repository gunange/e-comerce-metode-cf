import chalk from "chalk";
import app from "../index";

console.log(chalk.bold.blue("📌 Daftar Routes:"));

app.routes.forEach((route) => {
   let color = chalk.white; // Default warna putih

   if (route.method === "GET") color = chalk.green;
   if (route.method === "POST") color = chalk.blue;
   if (route.method === "PUT") color = chalk.yellow;
   if (route.method === "DELETE") color = chalk.red;
   if (route.method === "ALL") color = chalk.magenta;

   console.log(color(`${route.method.padEnd(6)} ${route.path}`));
});
