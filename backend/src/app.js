import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/TransactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import pointsRoutes from "./routes/pointsRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import cors from "cors";


//const cors = require('cors');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// MongoDB-based authentication routes
//app.use("/api/users", userRoutes);
app.use("/api/users", userRoutes); // /api/register, /api/login, etc.
app.use("/api/transactions", transactionRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/points", pointsRoutes);
app.use("/api/items", itemRoutes);

// Homepage
app.get("/", (req, res) => {
  res.send('<h1>Welcome</h1><a href="/login">Login</a>');
});

// User dashboard (optional: protect with JWT)
app.get("/dashboard", (req, res) => {
  res.send('<h1>User Dashboard</h1><a href="/logout">Logout</a>');
});

// Admin dashboard
app.get("/admin/dashboard", (req, res) => {
  res.send('<h1>Admin Dashboard</h1><a href="/logout">Logout</a>');
});

// Logout (just frontend redirect)
app.get("/logout", (req, res) => {
  res.redirect("/login");
});

// ✅ Serve frontend
// app.use(express.static(path.join(__dirname, "../auth0-login-demo/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../auth0-login-demo/build/index.html"));
// });

export default app;




// import express from "express";
// import session from "express-session";
// import passport from "passport";
// import { Strategy as Auth0Strategy } from "passport-auth0";
// import path from "path";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();

// const app = express();

// // Auth0 Configuration
// const authConfig = {
//   domain: process.env.AUTH0_DOMAIN,
//   clientID: process.env.AUTH0_CLIENTID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/callback",
// };

// // Session setup
// app.use(
//   session({
//     secret: "secret_key", // Replace with a secure key in production
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // Passport configuration
// passport.use(
//   new Auth0Strategy(
//     authConfig,
//     (accessToken, refreshToken, extraParams, profile, done) => {
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));

// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.get("/", (req, res) => {
//   res.send('<h1>Welcome</h1><a href="/login">Login</a>');
// });

// app.get(
//   "/login",
//   passport.authenticate("auth0", { scope: "openid email profile" })
// );

// app.get(
//   "/callback",
//   passport.authenticate("auth0", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/dashboard");
//   }
// );

// app.get("/dashboard", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//   res.send(
//     `<h1>Welcome to the Dashboard, ${req.user.displayName || "User"}!</h1><a href="/logout">Logout</a>`
//   );
// });

// app.get("/api/session", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ loggedIn: true, user: req.user });
//   } else {
//     res.json({ loggedIn: false });
//   }
// });

// app.get("/logout", (req, res) => {
//   req.logout(() => {
//     res.redirect(
//       `https://${authConfig.domain}/v2/logout?returnTo=http://localhost:3000/login&client_id=${authConfig.clientID}`
//     );
//   });
// });

// // Serve React frontend
// app.use(express.static(path.join(__dirname, "../auth0-login-demo/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../auth0-login-demo/build/index.html"));
// });

// // Start the server
// app.listen(3000, () => console.log("Server running on http://localhost:3000"));
