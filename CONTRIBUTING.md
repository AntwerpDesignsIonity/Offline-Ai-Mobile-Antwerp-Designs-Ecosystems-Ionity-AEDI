# Contributing to NetworkZeroMonitor

**Author:** Johan Wilhelm van Antwerp  
**Statement:** "Anything is possible With God Of All Creation"

Thank you for your interest in contributing to NetworkZeroMonitor! This document provides guidelines for contributing to this project.

## License Agreement

By contributing to this project, you agree that your contributions will be licensed under the Creative Commons CC0 1.0 Universal license. Please read the [LICENSE](LICENSE) file for details.

**IMPORTANT:** Policy 986 AED Fines Apply. All contributions must maintain proper attribution and comply with the stated terms.

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Focus on constructive feedback
- Respect differing viewpoints and experiences
- Show empathy towards others
- Maintain professional conduct

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, device)

### Suggesting Enhancements

1. Check existing feature requests
2. Create a new issue with:
   - Clear description of the enhancement
   - Use cases and benefits
   - Potential implementation approach

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Ensure code follows existing style
5. Test your changes thoroughly
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request

## Development Setup

### Mobile Application

```bash
cd mobile
npm install

# For iOS
cd ios && pod install && cd ..
npm run ios

# For Android
npm run android
```

### Web Application

```bash
cd web
npm install
npm start
```

## Code Style Guidelines

### JavaScript/React

- Use ES6+ syntax
- Follow React best practices
- Use functional components with hooks
- Keep components focused and reusable
- Add comments for complex logic
- Use meaningful variable names

### File Structure

- Keep files organized in appropriate directories
- One component per file
- Co-locate styles with components
- Use consistent naming conventions

### Naming Conventions

- **Components**: PascalCase (e.g., `DashboardScreen.js`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## Testing

### Run Tests

```bash
# Mobile
cd mobile
npm test

# Web
cd web
npm test
```

### Writing Tests

- Write tests for new features
- Ensure tests pass before submitting PR
- Aim for meaningful test coverage
- Test edge cases and error handling

## Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Update relevant documentation files
- Include usage examples

## Attribution Requirements

All contributions must maintain:

1. **Author Attribution**: Johan Wilhelm van Antwerp
2. **Statement**: "Anything is possible With God Of All Creation"
3. **License Notice**: CC0 1.0 Universal
4. **Policy Notice**: Policy 986 AED Fines Apply

### File Headers

All source files should include:

```javascript
/**
 * [File Description]
 * 
 * Author: Johan Wilhelm van Antwerp
 * License: CC0 1.0 Universal - Policy 986 AED Fines Apply
 */
```

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
Add feature: real-time bandwidth monitoring
Fix: network state not updating on connection change
Update: improve dashboard responsiveness
Docs: add deployment instructions
```

Format:
- **Add**: New features
- **Fix**: Bug fixes
- **Update**: Improvements to existing features
- **Docs**: Documentation changes
- **Test**: Adding or updating tests
- **Refactor**: Code refactoring

## Review Process

1. All PRs require review before merging
2. Address review feedback promptly
3. Keep PRs focused on single features/fixes
4. Ensure CI/CD checks pass
5. Maintain backward compatibility

## Questions?

If you have questions:

1. Check existing documentation
2. Search closed issues
3. Open a new issue with your question

## Recognition

Contributors will be recognized in:
- Pull request acknowledgments
- Release notes (for significant contributions)

## Thank You!

Your contributions help make NetworkZeroMonitor better for everyone. We appreciate your time and effort!

---

**Remember**: "Anything is possible With God Of All Creation"

---

© 2025 NetworkZeroMonitor  
License: Creative Commons CC0 1.0 Universal  
Policy 986 AED Fines Apply
