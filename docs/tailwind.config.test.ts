import { vi, expect, describe, it, beforeEach, afterEach } from 'vitest';
import type { Config } from 'tailwindcss';

// Import the default export from the module under test
import config from './tailwind.config';

// No external dependencies to mock in this simple config file, but demonstrate mocking pattern
vi.mock('fs', () => ({
  readFileSync: vi.fn(() => '{}'),
}));

describe('tailwind.config module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('default export', () => {
    it('should export an object as the default export', () => {
      expect(typeof config).toBe('object');
      expect(config).not.toBeNull();
    });

    it('should contain a theme property when present in config', () => {
      expect(config).toHaveProperty('theme');
      // theme should be an object
      expect(typeof (config as Config).theme).toBe('object');
    });

    it('should include expected core keys (theme, plugins, content) if defined', () => {
      expect(config).toHaveProperty('content');
      expect(Array.isArray((config as Config).content)).toBe(true);
      expect(config).toHaveProperty('plugins');
      expect(Array.isArray((config as Config).plugins)).toBe(true);
    });

    it('should preserve nested theme.extend values if provided', () => {
      const theme = (config as Config).theme as any;
      expect(theme).toBeDefined();
      expect(theme.extend).toBeDefined();
      expect(theme.extend.colors).toBeDefined();
      expect(theme.extend.colors).toHaveProperty('background');
      expect(theme.extend.colors).toHaveProperty('foreground');
      expect(theme.extend.colors.background).toBe('var(--background)');
    });

    it('should be serializable to JSON without circular references', () => {
      // JSON.stringify should not throw for this simple config
      expect(() => JSON.stringify(config)).not.toThrow();
      const json = JSON.stringify(config);
      expect(typeof json).toBe('string');
      expect(json.length).toBeGreaterThan(0);
    });

    it('should contain the expected paths in content array', () => {
      const content = (config as Config).content as string[];
      expect(content).toContain('./theme.config.tsx');
      expect(content.some(p => p.includes('pages'))).toBe(true);
      expect(content.some(p => p.includes('components'))).toBe(true);
    });

    it('should have empty plugins array by default', () => {
      expect((config as Config).plugins).toEqual([]);
    });
  });
});
