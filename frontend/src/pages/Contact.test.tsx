import { describe, expect, it } from 'vitest';
import Contact from './Contact';

describe('Contact', () => {
  it('module exports a component', () => {
    expect(typeof Contact).toBe('function');
  });
});
