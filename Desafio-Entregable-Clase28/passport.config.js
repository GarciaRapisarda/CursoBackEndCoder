import passport from "passport";
import local from "passport-local";
import { users } from "./models/user.js";
import { encryptPassword, comparePassword } from "./utils.js";


const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, username, password, done) => {
                try {
                    const user = await users.findOne({ username:
                    username });
                    if (user) {
                        return done(null, false, { message: "User already exists" });
                    }
                    const hashedPassword = await encryptPassword(password);
                    const newUser = await users.create({
                        username: username,
                        password: hashedPassword,
                        email: req.body.email,
                        name: req.body.name,
                        age: req.body.age,
                        address: req.body.address,
                    });
                    return done(null, newUser);
                } catch (error) {
                    done(error);
                }
            }
        )
    );
    passport.use(
        'login',
        new LocalStrategy(
            async(username, password, done) => {
                try {
                    let user = await users.findOne({ username: username })
                    if (!user) return done(null, false)
                    if (!comparePassword(user, password)) return done(null, false)
                    return done(null, user)
                } catch(err) {
                    done(err)
                }
            }
        )
    )
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await users.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};



