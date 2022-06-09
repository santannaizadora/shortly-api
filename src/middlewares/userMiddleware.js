export const checkIfIsTheUser = async (req, res, next) => {
    const { id } = req.params;
    const user = res.locals.user;
    if (user.id !== parseInt(id)) {
        return res.status(401).json({
            message: "You are not authorized to access this resource",
        });
    }
    next();
};

