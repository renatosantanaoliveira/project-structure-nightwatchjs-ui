module.exports = {
    //Executed before selenium session is created
    before: (done) => {
        done();
    },

    //Executed after closing the selenium session
    after: (done) => {
       done();
    }
}