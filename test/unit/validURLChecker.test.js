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

      test("URLs with invalid characters", () => {
          expect(
              validURLChecker("http://react-url-shortener-iota.com/><script>")
          ).equal(false);
      });
      test("URLs with spaces", () => {
          expect(validURLChecker("react-url-shortener-iota. com")).equal(false);
      });

      test("URLs with missing TLD", () => {
          expect(validURLChecker("react-url-shortener-iota.")).equal(false);
      });

      test("URLs with authentication components ", () => {
          expect(validURLChecker("https://user:pass@example.com")).equal(false);
      });

      test("URLs with international domains", () => {
          expect(validURLChecker("例子.测试")).equal(false);
      });
      test("Localhost URLs", () => {
          expect(validURLChecker("localhost:3000")).equal(false);
      });
      test("File URLs", () => {
          expect(validURLChecker("file:///path/to/file.html")).equal(false);
      });
  });

  describe("Valid URLs", () => {
    test("Domain only should pass", () => {
        expect(validURLChecker("react-url-shortener-iota.vercel.app")).equal(
            true
        );
    });

    test("URL with HTTPS protocol should pass", () => {
        expect(
            validURLChecker("https://react-url-shortener-iota.vercel.app")
        ).equal(true);
    });

    test("URL with HTTP protocol should pass", () => {
        expect(
            validURLChecker("http://react-url-shortener-iota.vercel.app")
        ).equal(true);
    });

      test("URLs with query parameters", () => {
          expect(validURLChecker("react-url-shortener-iota.com?param=value")).equal(
              true
          );
      });

      test("URLs with fragments", () => {
          expect(validURLChecker("example.com#section")).equal(true);
      });

      test("URLs with subdomains", () => {
          expect(validURLChecker("sub.example.com")).equal(true);
      });

      test("URLs with paths", () => {
          expect(validURLChecker("example.com/path/to/page")).equal(true);
      });

      test("URLs with ports", () => {
          expect(validURLChecker("example.com:8080")).equal(true);
      });

      test("IP addresses", () => {
          expect(validURLChecker("192.168.1.1")).equal(true);
      });
  });
});
