function adminMiddleware(req, res, next) {
    if (req.session.userLogged.role.name != "admin") {
      return res.redirect("/");
    }
  
    next();
  }
  
  module.exports = adminMiddleware;