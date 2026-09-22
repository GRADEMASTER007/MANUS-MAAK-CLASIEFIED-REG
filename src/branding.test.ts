import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const readProjectFile = (filePath: string) => fs.readFileSync(path.join(projectRoot, filePath), "utf8");

describe("Marketplace Hub permanent site shell", () => {
  it("keeps the requested Marketplace Hub and Business Directory positioning", () => {
    const html = readProjectFile("index.html");
    const hero = readProjectFile("src/components/VideoHero.tsx");

    expect(html).toContain("Marketplace Hub | Business Directory & Regional Commerce");
    expect(hero).toContain("Marketplace Hub");
    expect(hero).toContain("Business Directory");
  });

  it("keeps the regional payment gateway choices in the vendor boost flow", () => {
    const boostModal = readProjectFile("src/components/BoostModal.tsx");

    expect(boostModal).toContain("PayFast");
    expect(boostModal).toContain("Yoco");
    expect(boostModal).toContain("PayPal");
    expect(boostModal).toContain("/api/payments/checkout");
  });

  it("keeps frontend assets in the managed hosting upload directory", () => {
    const viteConfig = readProjectFile("vite.config.ts");
    const server = readProjectFile("server.ts");

    expect(viteConfig).toContain("outDir: 'dist/public'");
    expect(server).toContain("path.join(process.cwd(), 'dist', 'public')");
  });
});
