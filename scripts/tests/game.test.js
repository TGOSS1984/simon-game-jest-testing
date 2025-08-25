/**
 * @jest-environment jsdom
 */

const path = require("path");
const fs = require("fs");
const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game.js");

beforeAll(() => {
  const fileContents = fs.readFileSync(
    path.join(__dirname, "..", "..", "index.html"), // tests -> scripts -> project root
    "utf-8"
  );
  document.body.innerHTML = fileContents;
});

describe("game object contains correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true);
  });
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
  test("choices contain correct ids", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });
  test("turnNumber key exists", () => {
    expect("turnNumber" in game).toBe(true);
  });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();

    });
    test("should set game score to zero",() => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's game array",() => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear the player moves array",() => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 for the element with id of score",() => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to game",() => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons",() => {
        let button = document.getElementById(game.currentGame [0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber",() => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
});
