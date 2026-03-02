import { randomUUID } from "node:crypto";
import * as upload from "@/infra/storage/upload-file-to-storage";

import { describe, expect, it, vi } from "vitest";
import { makeShortLink } from "@/test/factories/make-short-link";
import { exportLinks } from "./export-links";
import { isRight, unwrapEither } from "@/infra/shared/either";

describe("export links", () => {
  it("should be able to export links", async () => {
    const uploadStub = vi.spyOn(upload, "uploadFileToStorage").mockImplementationOnce(async () => {
      return {
        key: `${randomUUID()}.csv`,
        url: "http://example.com/file.csv",
      };
    });

    const link1 = await makeShortLink();
    const link2 = await makeShortLink();
    const link3 = await makeShortLink();
    const link4 = await makeShortLink();
    const link5 = await makeShortLink();

    const sut = await exportLinks();

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream;
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = [];

      generatedCSVStream.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      generatedCSVStream.on("end", () => {
        resolve(Buffer.concat(chunks).toString("utf-8"));
      });

      generatedCSVStream.on("error", (err) => {
        reject(err);
      });
    });

    const csvAsArray = csvAsString
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    expect(isRight(sut)).toBe(true);
    expect(unwrapEither(sut).reportUrl).toBe("http://example.com/file.csv");
    expect(csvAsArray).toEqual([
      ["ID", "Original URL", "Short URL", "Access Count", "Created at"],
      [link1.id, link1.originalUrl, link1.shortUrl, link1.accessCount, link1.createdAt,],
      [link2.id, link2.originalUrl, link2.shortUrl, link2.accessCount, link2.createdAt,],
      [link3.id, link3.originalUrl, link3.shortUrl, link3.accessCount, link3.createdAt,],
      [link4.id, link4.originalUrl, link4.shortUrl, link4.accessCount, link4.createdAt,],
      [link5.id, link5.originalUrl, link5.shortUrl, link5.accessCount, link5.createdAt,],
    ]);
  });
});
