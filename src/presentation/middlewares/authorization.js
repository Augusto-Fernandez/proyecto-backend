import RoleManager from "../../domain/managers/RoleManager.js";

const authorization = (permission) => {
    return async (req, res, next) => {
        const { _doc } = req.user;
        const roleManager = new RoleManager()

        const prueba = await roleManager.getOne(_doc.role);

        if (!_doc.isAdmin && !prueba.id.permissions == permission) {
            return res.status(401).send({ message: 'Not authorized' });
        }

        next();
    }
}

export default authorization;