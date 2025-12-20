/**
 * Efficient Transformer Model for Offline LLM
 * Optimized for mobile and resource-constrained environments
 */

export interface ModelConfig {
  vocabSize: number;
  embeddingDim: number;
  numHeads: number;
  numLayers: number;
  maxSeqLength: number;
  ffnDim: number;
}

export interface TokenizerConfig {
  vocabSize: number;
  padToken: string;
  unkToken: string;
  bosToken: string;
  eosToken: string;
}

export class SimpleTokenizer {
  private vocab: Map<string, number>;
  private reverseVocab: Map<number, string>;
  private config: TokenizerConfig;

  constructor(config?: Partial<TokenizerConfig>) {
    this.config = {
      vocabSize: 10000,
      padToken: '[PAD]',
      unkToken: '[UNK]',
      bosToken: '[BOS]',
      eosToken: '[EOS]',
      ...config
    };

    this.vocab = new Map();
    this.reverseVocab = new Map();
    this.initializeVocab();
  }

  private initializeVocab(): void {
    // Initialize special tokens
    this.vocab.set(this.config.padToken, 0);
    this.vocab.set(this.config.unkToken, 1);
    this.vocab.set(this.config.bosToken, 2);
    this.vocab.set(this.config.eosToken, 3);

    // Basic vocabulary (ASCII characters, common words)
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?;:\'"()-[]{}@#$%^&*+=/<>\\|`~\n\t';
    let idx = 4;
    for (const char of chars) {
      if (!this.vocab.has(char)) {
        this.vocab.set(char, idx);
        this.reverseVocab.set(idx, char);
        idx++;
      }
    }

    // Common programming tokens and words
    const commonTokens = [
      'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return',
      'class', 'import', 'export', 'from', 'async', 'await', 'try', 'catch',
      'new', 'this', 'public', 'private', 'static', 'void', 'int', 'string',
      'the', 'is', 'to', 'and', 'a', 'of', 'in', 'that', 'it', 'with', 'as',
      'for', 'on', 'are', 'be', 'this', 'was', 'by', 'not', 'can', 'will',
      'GitHub', 'Copilot', 'AI', 'code', 'error', 'debug', 'help', 'explain'
    ];

    for (const token of commonTokens) {
      if (!this.vocab.has(token)) {
        this.vocab.set(token, idx);
        this.reverseVocab.set(idx, token);
        idx++;
      }
    }
  }

  encode(text: string): number[] {
    const tokens: number[] = [this.vocab.get(this.config.bosToken)!];
    
    // Simple word-level tokenization with character fallback
    const words = text.split(/(\s+|[.,!?;:'"()\-\[\]{}])/g).filter(w => w.length > 0);
    
    for (const word of words) {
      if (this.vocab.has(word)) {
        tokens.push(this.vocab.get(word)!);
      } else {
        // Character-level fallback
        for (const char of word) {
          tokens.push(this.vocab.get(char) ?? this.vocab.get(this.config.unkToken)!);
        }
      }
    }
    
    tokens.push(this.vocab.get(this.config.eosToken)!);
    return tokens;
  }

  decode(tokens: number[]): string {
    return tokens
      .map(t => this.reverseVocab.get(t) ?? this.config.unkToken)
      .filter(t => t !== this.config.bosToken && t !== this.config.eosToken && t !== this.config.padToken)
      .join('');
  }

  getVocabSize(): number {
    return this.vocab.size;
  }
}

export class TransformerLLM {
  private config: ModelConfig;
  private tokenizer: SimpleTokenizer;
  private weights: Map<string, number[][]>;

  constructor(config?: Partial<ModelConfig>) {
    this.config = {
      vocabSize: 10000,
      embeddingDim: 256,
      numHeads: 4,
      numLayers: 4,
      maxSeqLength: 512,
      ffnDim: 1024,
      ...config
    };

    this.tokenizer = new SimpleTokenizer({ vocabSize: this.config.vocabSize });
    this.weights = new Map();
    this.initializeWeights();
  }

  private initializeWeights(): void {
    // Initialize embedding weights (simplified)
    const embeddingWeights: number[][] = Array(this.config.vocabSize)
      .fill(0)
      .map(() => Array(this.config.embeddingDim).fill(0).map(() => Math.random() * 0.02 - 0.01));
    
    this.weights.set('embedding', embeddingWeights);
  }

  private softmax(logits: number[]): number[] {
    const maxLogit = Math.max(...logits);
    const expScores = logits.map(x => Math.exp(x - maxLogit));
    const sumExpScores = expScores.reduce((a, b) => a + b, 0);
    return expScores.map(x => x / sumExpScores);
  }

  private sample(probs: number[], temperature: number = 0.8): number {
    // Adjust probabilities with temperature
    const adjustedProbs = probs.map(p => Math.pow(p, 1 / temperature));
    const sum = adjustedProbs.reduce((a, b) => a + b, 0);
    const normalizedProbs = adjustedProbs.map(p => p / sum);

    // Sample from distribution
    const rand = Math.random();
    let cumSum = 0;
    for (let i = 0; i < normalizedProbs.length; i++) {
      cumSum += normalizedProbs[i];
      if (rand < cumSum) {
        return i;
      }
    }
    return normalizedProbs.length - 1;
  }

  async generate(prompt: string, maxLength: number = 100, temperature: number = 0.8): Promise<string> {
    const inputTokens = this.tokenizer.encode(prompt);
    const generatedTokens: number[] = [...inputTokens];
    
    const embeddingWeights = this.weights.get('embedding')!;
    const vocabSize = this.tokenizer.getVocabSize();

    for (let i = 0; i < maxLength; i++) {
      // Simplified forward pass
      const contextTokens = generatedTokens.slice(-this.config.maxSeqLength);
      
      // Get embeddings for context
      const contextEmbeddings = contextTokens.map(token => 
        embeddingWeights[Math.min(token, embeddingWeights.length - 1)]
      );

      // Simplified logits calculation (for demonstration)
      const lastEmbedding = contextEmbeddings[contextEmbeddings.length - 1];
      const logits = embeddingWeights.map(embedding => {
        // Dot product similarity
        let similarity = 0;
        for (let j = 0; j < Math.min(lastEmbedding.length, embedding.length); j++) {
          similarity += lastEmbedding[j] * embedding[j];
        }
        return similarity;
      });

      // Apply softmax to get probabilities
      const probs = this.softmax(logits.slice(0, vocabSize));
      
      // Sample next token
      const nextToken = this.sample(probs, temperature);
      generatedTokens.push(nextToken);

      // Check for end of sequence
      if (nextToken === 3) { // EOS token
        break;
      }
    }

    return this.tokenizer.decode(generatedTokens);
  }

  async complete(code: string, maxTokens: number = 50): Promise<string> {
    // Code completion mode with lower temperature
    return this.generate(code, maxTokens, 0.5);
  }

  async chat(message: string, context: string[] = []): Promise<string> {
    const fullPrompt = context.length > 0 
      ? context.join('\n') + '\nUser: ' + message + '\nAssistant: '
      : 'User: ' + message + '\nAssistant: ';
    
    return this.generate(fullPrompt, 150, 0.7);
  }
}
