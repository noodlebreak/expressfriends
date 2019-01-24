// This is the starting test file, should be on top after compiling
// The idea is to add requires here.
let app = require("../app/app.js"),
  chai = require("chai"),
  expect = chai.expect,
  chaiHttp = require("chai-http"),
  models = require("../app/models"),
  sequelize_config = require("../app/config/config"),
  seed = require("./seed"),
  createDatabase = require("../app/helpers/").createDatabase;

chai.use(chaiHttp);

describe("Testing server", () => {
  before(done => {
    // start with a fresh DB
    let test_db_name = sequelize_config[process.env.NODE_ENV].database;
    createDatabase(test_db_name, function() {
      models.sequelize
        // run migrations and initialize with seed data
        .sync({ force: true, match: /_test$/, logging: false })
        .then(() => {
          seed(models);
        })
        .then(() => {
          done();
        });
    });
  });

  it("should run", done => {
    expect(app).to.exist;
    done();
  });

  describe("User API Routes", () => {
    it("Fetch the template rendered con;tent at api base", done => {
      chai
        .request(app)
        .get("/api")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it("should fetch all users (list)", done => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it("should add a user)", done => {
      chai
        .request(app)
        .post("/api/users")
        .send({ firstName: "Don", lastName: "Draper" })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          let checkObj = {
            id: 16,
            firstName: "Don",
            lastName: "Draper"
          };
          expect(res.body).to.include(checkObj);
          done();
        });
    });
    it("should fetch a single user - infact, the one created in the test above)", done => {
      chai
        .request(app)
        .get("/api/users/16")
        .end((err, res) => {
          let checkObj = {
            id: 16,
            firstName: "Don",
            lastName: "Draper"
          };
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.include(checkObj);
          done();
        });
    });
    it("should successfully edit a user)", done => {
      chai
        .request(app)
        .patch("/api/users/16")
        .send({ firstName: "Betty" }) // We'll change the firstName of the User
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(202);
          let checkObj = {
            id: 16,
            firstName: "Betty",
            lastName: "Draper"
          };
          expect(res.body).to.include(checkObj);
          done();
        });
    });
    it("should delete a user", done => {
      chai
        .request(app)
        .del("/api/users/14")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
          done();
        });
    });
    it("should add friend)", done => {
      chai
        .request(app)
        .post("/api/users/1/friends")
        .send({ id: 16 })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.eql("");
          expect(res).to.have.status(200);
          done();
        });
    });
    it("should fetch all friends for a user", done => {
      chai
        .request(app)
        .get("/api/users/1/friends")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.length).to.eql(1);
          done();
        });
    });
    it("should fetch all friends of friends of a user", done => {
      chai
        .request(app)
        .get("/api/users/3/friends-of-friends")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.length).to.eql(0);
          done();
        });
    });
  });
});
