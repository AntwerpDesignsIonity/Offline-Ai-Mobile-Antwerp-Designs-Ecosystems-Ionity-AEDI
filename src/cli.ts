#!/usr/bin/env node

/**
 * Offline AI Copilot CLI
 * GitHub Copilot-inspired CLI for offline code assistance
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { TransformerLLM } from './core/transformer';
import { displayBanner, formatCodeBlock } from './utils/display';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();
const model = new TransformerLLM();

program
  .name('ai-copilot')
  .description('GitHub Copilot-inspired Offline AI Assistant for Code and Chat')
  .version('1.0.0');

program
  .command('chat')
  .description('Start an interactive chat session with the AI')
  .option('-c, --context <file>', 'Load context from a file')
  .action(async (options) => {
    displayBanner();
    console.log(chalk.cyan('💬 Starting AI Chat Session...\n'));
    console.log(chalk.gray('Type "exit" or "quit" to end the session\n'));

    const context: string[] = [];
    
    if (options.context && fs.existsSync(options.context)) {
      const contextContent = fs.readFileSync(options.context, 'utf-8');
      context.push(contextContent);
      console.log(chalk.green('✓ Context loaded from file\n'));
    }

    let continueChat = true;
    
    while (continueChat) {
      const { message } = await inquirer.prompt([
        {
          type: 'input',
          name: 'message',
          message: chalk.blue('You:'),
          prefix: ''
        }
      ]);

      if (message.toLowerCase() === 'exit' || message.toLowerCase() === 'quit') {
        console.log(chalk.yellow('\n👋 Goodbye!\n'));
        continueChat = false;
        break;
      }

      if (!message.trim()) {
        continue;
      }

      const spinner = ora('Thinking...').start();
      
      try {
        const response = await model.chat(message, context);
        spinner.stop();
        
        console.log(chalk.green('\nAI Copilot: ') + response + '\n');
        
        // Add to context
        context.push(`User: ${message}`);
        context.push(`Assistant: ${response}`);
        
        // Keep context manageable
        if (context.length > 10) {
          context.splice(0, 2);
        }
      } catch (error) {
        spinner.stop();
        console.log(chalk.red('Error: ') + (error as Error).message);
      }
    }
  });

program
  .command('complete <file>')
  .description('Get code completion suggestions for a file')
  .option('-l, --lines <number>', 'Number of lines to complete', '5')
  .action(async (file, options) => {
    displayBanner();
    
    if (!fs.existsSync(file)) {
      console.log(chalk.red('✗ File not found: ') + file);
      process.exit(1);
    }

    const code = fs.readFileSync(file, 'utf-8');
    const maxTokens = parseInt(options.lines) * 10; // Rough estimation
    
    console.log(chalk.cyan(`📝 Generating code completion for: ${path.basename(file)}\n`));
    
    const spinner = ora('Analyzing code...').start();
    
    try {
      const completion = await model.complete(code, maxTokens);
      spinner.stop();
      
      console.log(chalk.green('✓ Completion generated:\n'));
      console.log(formatCodeBlock(completion));
      console.log();
    } catch (error) {
      spinner.stop();
      console.log(chalk.red('Error: ') + (error as Error).message);
    }
  });

program
  .command('generate <prompt>')
  .description('Generate text or code from a prompt')
  .option('-l, --length <number>', 'Maximum length of generation', '100')
  .option('-t, --temperature <number>', 'Sampling temperature (0.0-2.0)', '0.8')
  .action(async (prompt, options) => {
    displayBanner();
    
    const maxLength = parseInt(options.length);
    const temperature = parseFloat(options.temperature);
    
    console.log(chalk.cyan('🚀 Generating response...\n'));
    
    const spinner = ora('Processing...').start();
    
    try {
      const result = await model.generate(prompt, maxLength, temperature);
      spinner.stop();
      
      console.log(chalk.green('✓ Generated:\n'));
      console.log(formatCodeBlock(result));
      console.log();
    } catch (error) {
      spinner.stop();
      console.log(chalk.red('Error: ') + (error as Error).message);
    }
  });

program
  .command('interactive')
  .alias('i')
  .description('Start interactive mode with multiple options')
  .action(async () => {
    displayBanner();
    
    const { mode } = await inquirer.prompt([
      {
        type: 'list',
        name: 'mode',
        message: 'What would you like to do?',
        choices: [
          { name: '💬 Chat with AI', value: 'chat' },
          { name: '📝 Code Completion', value: 'complete' },
          { name: '🚀 Generate Text', value: 'generate' },
          { name: '❌ Exit', value: 'exit' }
        ]
      }
    ]);

    if (mode === 'exit') {
      console.log(chalk.yellow('👋 Goodbye!\n'));
      return;
    }

    if (mode === 'chat') {
      program.parse(['node', 'cli', 'chat']);
    } else if (mode === 'complete') {
      const { file } = await inquirer.prompt([
        {
          type: 'input',
          name: 'file',
          message: 'Enter file path:'
        }
      ]);
      program.parse(['node', 'cli', 'complete', file]);
    } else if (mode === 'generate') {
      const { prompt } = await inquirer.prompt([
        {
          type: 'input',
          name: 'prompt',
          message: 'Enter your prompt:'
        }
      ]);
      program.parse(['node', 'cli', 'generate', prompt]);
    }
  });

program
  .command('info')
  .description('Display system and model information')
  .action(() => {
    displayBanner();
    console.log(chalk.cyan('📊 System Information:\n'));
    console.log(chalk.white('Platform: ') + process.platform);
    console.log(chalk.white('Architecture: ') + process.arch);
    console.log(chalk.white('Node Version: ') + process.version);
    console.log(chalk.white('Memory: ') + Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB\n');
    
    console.log(chalk.cyan('🤖 Model Information:\n'));
    console.log(chalk.white('Model Type: ') + 'Efficient Transformer');
    console.log(chalk.white('Mode: ') + 'Offline');
    console.log(chalk.white('Status: ') + chalk.green('Ready ✓'));
    console.log(chalk.white('Android 7+ Compatible: ') + chalk.green('Yes ✓\n'));
  });

// Default command
if (process.argv.length === 2) {
  displayBanner();
  program.help();
}

program.parse(process.argv);
