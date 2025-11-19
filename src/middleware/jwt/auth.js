import jwt from 'jsonwebtoken';

function Auth(req, res, next) {
    try {
        let token = String(req.headers.authorization || '').split(' ')[1];

        if (!token) return res.status(401).json({ message: "UnAuthorized" });

        req.user = jwt.verify(token, process.env.ACCESS_SECRET);
        next();

    } catch (error) {
        return res.status(403).json({
            message: "Invalid Token"
        })
    }
}

function RoleAuth(...roles) {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: "Access Denied" })
            }
            next()
        } catch (error) {

        }
    }
}

export { RoleAuth }
export default Auth;