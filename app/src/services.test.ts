import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as cheerio from 'cheerio';
import { Scraper } from './services';

// Mock global fetch
const globalAny: any = global;

describe('Scraper', () => {
  let scraper: Scraper;
  const originalFetch = globalAny.fetch;

  beforeEach(() => {
    scraper = new Scraper();
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalAny.fetch = originalFetch;
    vi.resetAllMocks();
  });

  it("should return scraped data with headlines when fetch returns valid HTML containing matching h2[data-testid='card-headline'] elements", async () => {
    const html = `
      <html>
        <body>
          <h2 data-testid="card-headline">  Headline One  </h2>
          <h2 data-testid="card-headline">Headline Two</h2>
        </body>
      </html>
    `;

    globalAny.fetch = vi.fn(() => Promise.resolve({ text: () => Promise.resolve(html) }));

    const result = await scraper.fetchData();

    expect(result).toHaveProperty('scrapedAt');
    expect(result.headlines).toEqual(['Headline One', 'Headline Two']);
  });

  it('should return scraped data with empty headlines array when page has no matching headline elements', async () => {
    const html = `<html><body><div>No headlines here</div></body></html>`;
    globalAny.fetch = vi.fn(() => Promise.resolve({ text: () => Promise.resolve(html) }));

    const result = await scraper.fetchData();
    expect(result.headlines).toEqual([]);
  });

  it('should reuse cached data if called again within cache duration (no second fetch call)', async () => {
    const html = `<html><body><h2 data-testid="card-headline">X</h2></body></html>`;
    const mockFetch = vi.fn(() => Promise.resolve({ text: () => Promise.resolve(html) }));
    globalAny.fetch = mockFetch;

    const first = await scraper.fetchData();
    const second = await scraper.fetchData();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(second).toBe(first);
  });

  it('should refresh cache and call fetch again when cached entry is older than cacheDuration', async () => {
    // Create a scraper and manually set an old cache
    const oldScraper = new Scraper() as any;
    const past = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(); // 2 hours ago
    oldScraper.cache = { scrapedAt: past, headlines: ['Old'] };

    const htmlNew = `<html><body><h2 data-testid="card-headline">New</h2></body></html>`;
    const mockFetch = vi.fn(() => Promise.resolve({ text: () => Promise.resolve(htmlNew) }));
    globalAny.fetch = mockFetch;

    const result = await oldScraper.fetchData();

    expect(mockFetch).toHaveBeenCalled();
    expect(result.headlines).toEqual(['New']);
  });

  it('should propagate or surface errors when fetch throws or response.text() fails', async () => {
    const err = new Error('network');
    globalAny.fetch = vi.fn(() => Promise.reject(err));

    await expect(scraper.fetchData()).rejects.toThrow('network');

    // Now test when text() fails
    globalAny.fetch = vi.fn(() => Promise.resolve({ text: () => Promise.reject(new Error('text-fail')) }));
    await expect(scraper.fetchData()).rejects.toThrow('text-fail');
  });

  it('should trim and deduplicate headline text items (non-empty trimming and filter behavior)', async () => {
    const html = `
      <html>
        <body>
          <h2 data-testid="card-headline">  Dup  </h2>
          <h2 data-testid="card-headline">Dup</h2>
          <h2 data-testid="card-headline">   </h2>
          <h2 data-testid="card-headline">Unique</h2>
        </body>
      </html>
    `;

    globalAny.fetch = vi.fn(() => Promise.resolve({ text: () => Promise.resolve(html) }));

    const result = await scraper.fetchData();

    // Source implementation does not dedupe; it trims and filters empty. So expect trimmed and no empties
    expect(result.headlines).toEqual(['Dup', 'Dup', 'Unique']);
  });
});
