import jwt from 'jsonwebtoken';

export const autenticarJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("HEADER:", authHeader);//
    console.log("SECRET:", process.env.JWT_SECRET);//
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log("TOKEN:", token);//
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            console.log("ERROR JWT:", err);//
            if (err) {
                return res.status(401).json({ mensaje: 'Token invalido' });
            }
            req.usuario = decoded;
            next();
        });
    } else {
        res.status(401).json({ mensaje: 'Acceso no autorizado' });
    }
};

export const autorizarRol = (rolPermitido) => {
    return (req, res, next) => {
        if (req.usuario && req.usuario.role === rolPermitido) {
            next();
        } else {
            res.status(403).json({ mensaje: 'No tienes permiso para realizar esta accion' });
        }


    };
}