# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Customs Calculator seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to security@customs-calculator.jo.

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

- Type of issue (buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the vulnerability
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

## Security Best Practices

### For Users
- Keep your dependencies updated
- Use HTTPS in production
- Implement proper authentication and authorization
- Validate and sanitize all user inputs
- Use environment variables for sensitive data
- Regularly backup your data
- Monitor your application logs

### For Developers
- Follow secure coding practices
- Use prepared statements for database queries
- Implement proper error handling
- Use HTTPS in production
- Keep dependencies updated
- Use security headers
- Implement rate limiting
- Use input validation and sanitization
- Follow the principle of least privilege
- Regular security audits

## Security Features

### Implemented Security Measures
- CORS configuration
- Input validation and sanitization
- Environment variable protection
- HTTPS enforcement in production
- Security headers
- Rate limiting (planned)
- SQL injection prevention
- XSS protection
- CSRF protection (planned)

### Planned Security Features
- Rate limiting implementation
- CSRF token protection
- Advanced input validation
- Security audit logging
- Automated vulnerability scanning
- Dependency vulnerability monitoring

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any similar problems
3. Prepare fixes for all supported versions
4. Release new versions to all package managers
5. Announce the security issue

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and will be clearly marked as security updates in the changelog.

## Responsible Disclosure

We appreciate security researchers who:

- Give us reasonable time to respond to issues before any disclosure
- Make a good faith effort to avoid privacy violations, data destruction, and interruption or degradation of our services
- Do not access or modify user data
- Do not perform actions that may negatively impact other users
- Do not perform actions that may negatively impact the operation of our services

## Contact

For security-related questions or concerns, please contact us at:

- Email: security@customs-calculator.jo
- PGP Key: [Add your PGP key here]

## Acknowledgments

We would like to thank all security researchers who have responsibly disclosed vulnerabilities to us. Your contributions help make our software more secure for everyone.