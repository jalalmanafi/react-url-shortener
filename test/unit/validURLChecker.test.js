import { test, expect, describe } from "vitest";

import { validURLChecker } from "../../src/helper/validURLChecker.js";

describe("validURLChecker function", () => {

  describe("Invlaid URLs", () => {
    test("Plain text without domain should fail", () => {
        expect(validURLChecker("react-url-shortener-iota")).equal(false);
    });

    test("Epmty string should fail", () => {
      expect(validURLChecker("")).equal(false);
    });

  });

  describe("Valid URLs", () => {
    test("Domain only should pass", () => {
        expect(validURLChecker("react-url-shortener-iota.vercel.app")).equal(true);
    });

    test("URL with HTTPS protocol should pass", () => {
        expect(validURLChecker("https://react-url-shortener-iota.vercel.app")).equal(true);
    });

    test("URL with HTTP protocol should pass", () => {
        expect(validURLChecker("http://react-url-shortener-iota.vercel.app")).equal(true);
      });
  });
});
