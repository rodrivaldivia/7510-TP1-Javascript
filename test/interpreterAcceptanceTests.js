var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan)'));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia)'));
        });

        it('padre(juan, pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

        it('padre(mario, pepe) should be juan', function () {
            assert(interpreter.checkQuery('padre(mario, juan)') === false);
        });

        it('padre(hector, maria) should be true', function () {
            assert(interpreter.checkQuery('padre(hector, maria)') === true);
        });

        it('Incomplete query should throw an error', function () {
            expect(function() {interpreter.checkQuery('padre')}).to.throw(Error);
        });

        it('Invalid query should throw an error', function () {
            expect(function() {interpreter.checkQuery('padre((camila, juan))')}).to.throw(Error);
        });

        it('Invalid query should throw an error', function () {
            expect(function() {interpreter.checkQuery('padre[mario, juan]')}).to.throw(Error);
        });


    });

    describe('Interpreter Rules', function () {

        it('sobrino(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('sobrino(pepe, juan)') === false);
        });

        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });

        it('hijo(juan, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(juan, juan)') === false);
        });

        it('hija(pepa, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepa, juan)') === false);
        });
        // TODO: Add more tests

    });


});


