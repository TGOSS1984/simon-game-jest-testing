/**
 * @jest-environment jsdom
 */

const path = require("path");
const fs = require("fs");
const { game } = require("../game.js");

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
});
