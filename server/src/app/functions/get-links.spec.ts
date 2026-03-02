
import { isRight, unwrapEither } from "@/infra/shared/either";
import { makeShortLink } from "@/test/factories/make-short-link";
import { describe, expect, it } from "vitest";
import { getLinks } from "./get-links";

describe("get links", () => {
  it("should be able to get the links", async () => {

    const link1 = await makeShortLink();
    const link2 = await makeShortLink();
    const link3 = await makeShortLink();
    const link4 = await makeShortLink();
    const link5 = await makeShortLink();
    const sut = await getLinks();

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: link5.id }),
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ]);
  });


});
