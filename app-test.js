
const mongoose = require("mongoose");
const server = require("./app");
const chai = require("chai");
const chaiHttp = require("chai-http");

// Assertion
chai.should();
chai.use(chaiHttp);

describe('Planets API Suite', () => {

    // Reusable function to fetch planet details
    const fetchPlanetDetails = async (id, expectedName) => {
        const payload = { id };
        try {
            const res = await chai.request(server)
                .post('/planet')
                .send(payload);

            res.should.have.status(200);
            res.body.should.have.property('id').eql(id);
            res.body.should.have.property('name').eql(expectedName);
        } catch (error) {
            console.error(`Error fetching planet with id: ${id}`, error);
            throw error;
        }
    };

    describe('Fetching Planet Details', () => {

        it('it should fetch a planet named Mercury', async () => {
            await fetchPlanetDetails(1, 'Mercury');
        });

        it('it should fetch a planet named Venus', async () => {
            await fetchPlanetDetails(2, 'Venus');
        });

        it('it should fetch a planet named Earth', async () => {
            await fetchPlanetDetails(3, 'Earth');
        });

        it('it should fetch a planet named Mars', async () => {
            await fetchPlanetDetails(4, 'Mars');
        });

        it('it should fetch a planet named Jupiter', async () => {
            await fetchPlanetDetails(5, 'Jupiter');
        });

        it('it should fetch a planet named Saturn', async () => {
            await fetchPlanetDetails(6, 'Saturn');
        });

        it('it should fetch a planet named Uranus', async () => {
            await fetchPlanetDetails(7, 'Uranus');
        });

        it('it should fetch a planet named Neptune', async () => {
            await fetchPlanetDetails(8, 'Neptune');
        });

        // Uncomment if you need to test Pluto
        // it('it should fetch a planet named Pluto', async () => {
        //     await fetchPlanetDetails(9, 'Pluto');
        // });
    });
});

// Use below test case to achieve coverage for other endpoints
describe('Testing Other Endpoints', () => {

    describe('it should fetch OS Details', () => {
        it('it should fetch OS details', async () => {
            const res = await chai.request(server).get('/os');
            res.should.have.status(200);
        });
    });

    describe('it should fetch Live Status', () => {
        it('it checks Liveness endpoint', async () => {
            const res = await chai.request(server).get('/live');
            res.should.have.status(200);
            res.body.should.have.property('status').eql('live');
        });
    });

    describe('it should fetch Ready Status', () => {
        it('it checks Readiness endpoint', async () => {
            const res = await chai.request(server).get('/ready');
            res.should.have.status(200);
            res.body.should.have.property('status').eql('ready');
        });
    });

});

~      
