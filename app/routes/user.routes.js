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

    app.get("/api/all/test", controller.allAccess);

    app.get(
        "/api/user/test",
        [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/user/profile",
        [authJwt.verifyToken],
        controller.getUserProfile
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/students",
        [authJwt.verifyToken],
        controller.getCandidates
    );

    app.get(
        "/api/student/:student_id",
        [authJwt.verifyToken],
        controller.getCandidateByStudentId
    );

    app.put(
        "/api/student/:student_id",
        [authJwt.verifyToken],
        controller.updateStudent
    );

    app.delete(
        "/api/student/:student_id",
        [authJwt.verifyToken],
        controller.deleteStudent
    );

    app.get(
        "/api/attendance/:date",
        [authJwt.verifyToken],
        controller.getAttendanceByDate
    );

    app.get(
        "/api/attendance/export/:date",
        [authJwt.verifyToken],
        controller.exportAttendanceData
    );
};
