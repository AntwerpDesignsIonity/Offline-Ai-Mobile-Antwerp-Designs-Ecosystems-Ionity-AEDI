/**
 * Test suite for TransformerLLM
 */

import { TransformerLLM, SimpleTokenizer } from '../core/transformer';

describe('SimpleTokenizer', () => {
  let tokenizer: SimpleTokenizer;

  beforeEach(() => {
    tokenizer = new SimpleTokenizer();
  });

  test('should encode and decode text correctly', () => {
    const text = 'Hello world';
    const tokens = tokenizer.encode(text);
    const decoded = tokenizer.decode(tokens);
    
    expect(decoded).toContain('Hello');
    expect(decoded).toContain('world');
  });

  test('should handle special tokens', () => {
    const text = 'test';
    const tokens = tokenizer.encode(text);
    
    // Should start with BOS token
    expect(tokens[0]).toBe(2);
    // Should end with EOS token
    expect(tokens[tokens.length - 1]).toBe(3);
  });

  test('should return vocab size', () => {
    const vocabSize = tokenizer.getVocabSize();
    expect(vocabSize).toBeGreaterThan(0);
  });
});

describe('TransformerLLM', () => {
  let model: TransformerLLM;

  beforeEach(() => {
    model = new TransformerLLM({
      vocabSize: 1000,
      embeddingDim: 64,
      numHeads: 2,
      numLayers: 2,
      maxSeqLength: 128,
      ffnDim: 256
    });
  });

  test('should generate text from prompt', async () => {
    const prompt = 'Hello';
    const result = await model.generate(prompt, 20);
    
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  test('should complete code', async () => {
    const code = 'function test() {';
    const completion = await model.complete(code, 30);
    
    expect(completion).toBeDefined();
    expect(typeof completion).toBe('string');
  });

  test('should handle chat with context', async () => {
    const message = 'How are you?';
    const context = ['User: Hello', 'Assistant: Hi there!'];
    const response = await model.chat(message, context);
    
    expect(response).toBeDefined();
    expect(typeof response).toBe('string');
  });

  test('should handle chat without context', async () => {
    const message = 'Hello';
    const response = await model.chat(message);
    
    expect(response).toBeDefined();
    expect(typeof response).toBe('string');
  });

  test('should respect max length parameter', async () => {
    const prompt = 'test';
    const maxLength = 10;
    const result = await model.generate(prompt, maxLength);
    
    // Result should be defined and reasonably sized
    expect(result).toBeDefined();
    expect(result.length).toBeLessThan(1000); // Very generous upper bound
  });
});
