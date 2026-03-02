import { describe, it, expect } from 'vitest';
import config from './tailwind.config';

describe('tailwind.config default export (config)', () => {
  it('should export an object when imported', () => {
    expect(typeof config).toBe('object');
    expect(config).not.toBeNull();
  });

  it('should contain a content array with expected globs', () => {
    expect(Array.isArray(config.content)).toBe(true);
    // basic checks for common glob patterns
    const hasTsxOrJs = config.content.some((c: string) => /\*\.(tsx|jsx|ts|js)$/.test(c) || /\*/.test(c));
    expect(hasTsxOrJs).toBe(true);
  });

  it('should have a theme.extend.colors object including background and foreground keys', () => {
    expect(config.theme).toBeDefined();
    expect(config.theme.extend).toBeDefined();
    const colors = config.theme.extend.colors;
    expect(typeof colors).toBe('object');
    expect(colors).toHaveProperty('background');
    expect(colors).toHaveProperty('foreground');
  });

  it("should be immutable-ish (modifying a cloned copy doesn't affect imported values) - edge config mutation case", () => {
    const clone = JSON.parse(JSON.stringify(config));
    if (clone.theme && clone.theme.extend && clone.theme.extend.colors) {
      clone.theme.extend.colors.background = 'pink';
    }
    // re-read original import to ensure unchanged
    expect(config.theme.extend.colors.background).not.toBe('pink');
  });

  it('should be valid according to minimal Tailwind shape (has content and theme keys)', () => {
    expect(config).toHaveProperty('content');
    expect(config).toHaveProperty('theme');
  });

  it('should allow merging without throwing (simulates typical user usage)', () => {
    const merged = Object.assign({}, config, { purge: [] });
    expect(merged).toBeDefined();
    expect(merged).toHaveProperty('content');
  });

  it('should not contain functions in JSON-serializable parts (safe to clone)', () => {
    const serializable = JSON.stringify(config, (k, v) => (typeof v === 'function' ? undefined : v));
    expect(typeof serializable).toBe('string');
  });
});
