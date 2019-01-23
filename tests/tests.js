// This is the starting test file, should be on top after compiling
// The idea is to add requires here.
let app = require("../app/app.js"),
  chai = require("chai"),
  expect = chai.expect,
  chaiHttp = require("chai-http"),
  models = require("../app/models"),
  seedUsers = require("./seeds/users"),
  seedFriendships = require("./seeds/friendships");

chai.use(chaiHttp);

console.log("seedUsers is: " + seedUsers);
console.log("seedFriendships is: " + seedFriendships);

describe("Testing server", () => {
  it("should run", done => {
    expect(app).to.exist;
    done();
  });

  describe("User API Routes", () => {
    // start with a fresh DB
    beforeEach(done => {
      console.log(
        "\n\n",
        `NODE_ENV=${process.env.NODE_ENV}`,
        `DB_NAME=${process.env.DB_NAME}`,
        `DB_URL=${process.env.DATABASE_URL}`,
        "\n\n"
      );
      models.sequelize
        .sync({ force: true, match: /_test$/, logging: false })
        .then(() => {
          return seedUsers(models).then(() => {
            seedFriendships(models);
          });
        })
        .then(() => {
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
    it("should fetch all friends of a user (friends list)", done => {
      chai
        .request(app)
        .get("/api/users/3/friends/")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.length).to.eql(6); // 6 records will be returned
          done();
        });
    });
    it("should fetch friends of friends of a user", done => {
      chai
        .request(app)
        .get("/api/users/3/friends-of-friends")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          // console.log("FoF length: ", res.body.length);
          expect(res.body.length).to.eql(12); // 12 records
          done();
        });
    });
  });

  describe("API base", function() {
    it("should return api base template response", function() {
      // expect(false).to.equal(true);
    });
  });
});
