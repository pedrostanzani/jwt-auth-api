import axios from 'axios';
import * as cheerio from 'cheerio';

interface CacheEntry {
  scrapedAt: string;
  headlines: string[];
}

export class Scraper {
  private cache: CacheEntry | null = null;
  private cacheDuration = 60 * 60 * 1000;

  async fetchData(): Promise<CacheEntry> {
    const now = Date.now();

    if (this.cache && now - new Date(this.cache.scrapedAt).getTime() < this.cacheDuration) {
      return this.cache;
    }

    const scrapedAt = new Date().toISOString();

    const response = await axios.get('https://www.bbc.com/', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        Connection: 'keep-alive',
        Referer: 'https://www.google.com/',
        'Cache-Control': 'no-cache',
      },
      responseType: 'text',
    });

    const $ = cheerio.load(response.data);
    const headlines: string[] = [];
    $("h2[data-testid='card-headline']").each((_, element) => {
      const headline = $(element).text().trim();
      if (headline) {
        headlines.push(headline);
      }
    });

    const data = { scrapedAt, headlines };
    this.cache = data;
    
    return data;
  }
}
