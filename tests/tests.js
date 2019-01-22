// This is the starting test file, should be on top after compiling
// The idea is to add requires here.
let app = require('../app.js'),
    chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('server', () => {

    it('App should run', done => {
        expect(app).to.exist
        done()
    });

    describe('User API Routes', () => {
        it('Fetch all users (list)', done => {
            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done()
                });
        });
        it('Fetch all friends of a user (friends list)', done => {
            chai.request(app)
                .get('/api/users/3/friends/')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body.length).to.eql(6); // 6 records will be returned
                    done()
                });
        });
        it('Fetch friends of friends of a user', done => {
            chai.request(app)
                .get('/api/users/3/friends-of-friends')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    // console.log("FoF length: ", res.body.length);
                    expect(res.body.length).to.eql(12); // 12 records
                    done()
                });
        });
    });

    describe('API base', function () {
        it('/api', function () {
            // expect(false).to.equal(true);
        });
    });
});
