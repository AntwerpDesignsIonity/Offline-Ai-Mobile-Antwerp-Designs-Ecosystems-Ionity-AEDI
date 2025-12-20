/**
 * Display utilities for CLI with GitHub branding
 */

import chalk from 'chalk';

export function displayBanner(): void {
  console.clear();
  console.log(chalk.cyan('╔════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║') + '                                                            ' + chalk.cyan('║'));
  console.log(chalk.cyan('║') + '        ' + chalk.white.bold('🤖 Offline AI Copilot') + '                              ' + chalk.cyan('║'));
  console.log(chalk.cyan('║') + '        ' + chalk.gray('GitHub Copilot Inspired - Offline Mode') + '        ' + chalk.cyan('║'));
  console.log(chalk.cyan('║') + '                                                            ' + chalk.cyan('║'));
  console.log(chalk.cyan('╚════════════════════════════════════════════════════════════╝'));
  console.log();
}

export function displayGitHubLogo(): void {
  console.log(chalk.white('    ██████╗ ██╗████████╗██╗  ██╗██╗   ██╗██████╗'));
  console.log(chalk.white('   ██╔════╝ ██║╚══██╔══╝██║  ██║██║   ██║██╔══██╗'));
  console.log(chalk.white('   ██║  ███╗██║   ██║   ███████║██║   ██║██████╔╝'));
  console.log(chalk.white('   ██║   ██║██║   ██║   ██╔══██║██║   ██║██╔══██╗'));
  console.log(chalk.white('   ╚██████╔╝██║   ██║   ██║  ██║╚██████╔╝██████╔╝'));
  console.log(chalk.white('    ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝'));
  console.log(chalk.cyan('                 Copilot - AI Pair Programmer'));
  console.log();
}

export function formatCodeBlock(code: string, language: string = ''): string {
  const lines = code.split('\n');
  const formattedLines = lines.map((line, index) => {
    const lineNum = String(index + 1).padStart(3, ' ');
    return chalk.gray(lineNum + ' │ ') + chalk.white(line);
  });
  
  return '\n' + chalk.gray('  ┌' + '─'.repeat(70) + '\n') +
         formattedLines.join('\n') + '\n' +
         chalk.gray('  └' + '─'.repeat(70));
}

export function displayWelcome(): void {
  displayBanner();
  console.log(chalk.cyan('Welcome to Offline AI Copilot!\n'));
  console.log(chalk.white('This tool provides AI-powered code assistance without an internet connection.'));
  console.log(chalk.white('Perfect for mobile devices, including Android 7+.\n'));
  
  console.log(chalk.yellow('Quick Start:\n'));
  console.log(chalk.white('  • Chat:        ') + chalk.cyan('ai-copilot chat'));
  console.log(chalk.white('  • Complete:    ') + chalk.cyan('ai-copilot complete <file>'));
  console.log(chalk.white('  • Generate:    ') + chalk.cyan('ai-copilot generate "<prompt>"'));
  console.log(chalk.white('  • Interactive: ') + chalk.cyan('ai-copilot interactive'));
  console.log(chalk.white('  • Server:      ') + chalk.cyan('npm run server\n'));
}

export function displayProgress(message: string, percentage: number): void {
  const barLength = 40;
  const filled = Math.floor((percentage / 100) * barLength);
  const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
  
  console.log(chalk.cyan(message) + ' ' + chalk.white(bar) + ' ' + chalk.yellow(percentage + '%'));
}

export function displayError(error: string): void {
  console.log(chalk.red('✗ Error: ') + error);
}

export function displaySuccess(message: string): void {
  console.log(chalk.green('✓ ') + message);
}

export function displayInfo(message: string): void {
  console.log(chalk.blue('ℹ ') + message);
}
