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

  it("keeps the homepage organized around the four core directories", () => {
    const pillarDiscovery = readProjectFile("src/components/PillarDiscovery.tsx");
    const app = readProjectFile("src/App.tsx");

    expect(pillarDiscovery).toContain("Marketplace");
    expect(pillarDiscovery).toContain("Business directory");
    expect(pillarDiscovery).toContain("Services directory");
    expect(pillarDiscovery).toContain("Property directory");
    expect(app).toContain("<PillarDiscovery");
  });

  it("keeps tailored filter language for each directory landing page", () => {
    const directoryLanding = readProjectFile("src/components/DirectoryLandingPage.tsx");

    expect(directoryLanding).toContain("What kind of business are you looking for?");
    expect(directoryLanding).toContain("What needs to get done?");
    expect(directoryLanding).toContain("What kind of property are you after?");
    expect(directoryLanding).toContain("Apply filters");
  });

  it("keeps map browsing and radius controls connected to directory results", () => {
    const mapPanel = readProjectFile("src/components/DirectoryMapPanel.tsx");
    const app = readProjectFile("src/App.tsx");

    expect(mapPanel).toContain("Browse on the map");
    expect(mapPanel).toContain("['all', 5, 10, 25, 50]");
    expect(mapPanel).toContain("AdvancedMarkerElement");
    expect(app).toContain("distanceBetweenKm");
    expect(app).toContain("<DirectoryMapPanel");
  });
});
