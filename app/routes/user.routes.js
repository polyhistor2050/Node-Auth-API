const { authJwt } = require("../middleware");
const controller = require("../controllers/user.contoller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/candidate/allcandidate",
        [authJwt.verifyToken],
        controller.getCandidates
    );

    app.get(
        "/api/candidate/:student_id",
        [authJwt.verifyToken],
        controller.getCandidateByStudentId
    );

    app.put(
        "/api/candidate/:student_id",
        [authJwt.verifyToken],
        controller.updateStudent
    );

    app.delete(
        "/api/candidate/:student_id",
        [authJwt.verifyToken],
        controller.deleteStudent
    );
};
