import { logger } from '@/lib/services/logger';
import crypto from 'crypto';
import DOMPurify from 'dompurify';

// Type definitions
interface SanitizeHtmlOptions {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    stripTags?: boolean;
}

interface SanitizeObjectOptions {
    stripHtml?: boolean;
    sanitizeStrings?: boolean;
    allowedKeys?: string[];
    maxDepth?: number;
}

interface CSPDirectives {
    defaultSrc?: string[];
    scriptSrc?: string[];
    styleSrc?: string[];
    imgSrc?: string[];
    fontSrc?: string[];
    connectSrc?: string[];
    frameSrc?: string[];
    objectSrc?: string[];
    baseUri?: string[];
    formAction?: string[];
    upgradeInsecureRequests?: boolean;
}

// Type guards
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

function isPrimitive(value: unknown): value is string | number | boolean | null | undefined {
    return (
        value === null ||
        value === undefined ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean'
    );
}

// Fix the sanitizeHtml function
export function sanitizeHtml(dirty: string, options: SanitizeHtmlOptions = {}): string {
    if (!isString(dirty)) {
        logger.warn('Invalid input for HTML sanitization', {
            inputType: typeof dirty
        });
        return '';
    }

    try {
        logger.debug('Sanitizing HTML content', {
            inputLength: dirty.length,
            stripTags: options.stripTags
        });

        if (options.stripTags) {
            return stripAllTags(dirty);
        }

        const allowedAttrs = options.allowedAttributes
            ? Object.keys(options.allowedAttributes).reduce((acc, tag) => {
                  const attrs = options.allowedAttributes![tag];
                  return acc.concat(attrs.map((attr) => `${tag}:${attr}`));
              }, [] as string[])
            : [];

        const clean = DOMPurify.sanitize(dirty, {
            ALLOWED_TAGS: options.allowedTags || [
                'p',
                'br',
                'strong',
                'em',
                'u',
                's',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'ul',
                'ol',
                'li',
                'blockquote'
            ],
            ALLOWED_ATTR: allowedAttrs.length > 0 ? allowedAttrs : undefined
        });

        logger.debug('HTML sanitization completed', {
            inputLength: dirty.length,
            outputLength: clean.length,
            sanitized: dirty.length !== clean.length
        });

        return clean;
    } catch (error) {
        logger.error('HTML sanitization failed', error instanceof Error ? error : undefined, {
            inputLength: dirty.length
        });

        return stripAllTags(dirty);
    }
}

// Strip all HTML tags
// Secure implementation of stripAllTags
export function stripAllTags(input: string): string {
    if (!isString(input)) {
        return '';
    }

    try {
        // ✨ Simplified approach for better security
        let sanitized = input;

        // Use DOMPurify as the primary sanitization mechanism
        if (typeof DOMPurify !== 'undefined') {
            sanitized = DOMPurify.sanitize(input, {
                ALLOWED_TAGS: [],
                ALLOWED_ATTR: [],
                KEEP_CONTENT: true
            });
        }

        // Step 2: Use DOMPurify as additional security layer if available
        if (typeof DOMPurify !== 'undefined') {
            sanitized = DOMPurify.sanitize(sanitized, {
                ALLOWED_TAGS: [],
                ALLOWED_ATTR: [],
                KEEP_CONTENT: true
            });
        }

        // Step 3: Final cleanup
        sanitized = sanitized
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();

        logger.debug('Tags stripped from content', {
            originalLength: input.length,
            sanitizedLength: sanitized.length,
            removed: input.length - sanitized.length
        });

        return sanitized;
    } catch (error) {
        logger.error('Tag stripping failed', error instanceof Error ? error : undefined, {
            inputLength: input.length
        });

        // Fallback: very aggressive sanitization
        return input
            .replace(/[<>&"']/g, '') // Remove all potentially dangerous characters
            .replace(/\s+/g, ' ')
            .trim();
    }
}

// SQL injection prevention
export function sanitizeSqlInput(input: string): string {
    if (!isString(input)) {
        logger.warn('Invalid input for SQL sanitization', {
            inputType: typeof input
        });
        return '';
    }

    try {
        return input
            .replace(/'/g, "''")
            .replace(/;/g, '')
            .replace(/--/g, '')
            .replace(/\/\*/g, '')
            .replace(/\*\//g, '')
            .replace(/xp_/gi, '')
            .replace(/sp_/gi, '')
            .trim();
    } catch (error) {
        logger.error('SQL input sanitization failed', error instanceof Error ? error : undefined, {
            inputLength: input.length
        });
        return '';
    }
}

// XSS prevention
export function sanitizeUserInput(input: string): string {
    if (!isString(input)) {
        logger.warn('Invalid input for user input sanitization', {
            inputType: typeof input
        });
        return '';
    }

    try {
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .trim();
    } catch (error) {
        logger.error('User input sanitization failed', error instanceof Error ? error : undefined, {
            inputLength: input.length
        });
        return '';
    }
}

// File name sanitization
export function sanitizeFileName(fileName: string): string {
    if (!isString(fileName)) {
        logger.warn('Invalid input for filename sanitization', {
            inputType: typeof fileName
        });
        return 'unnamed_file';
    }

    try {
        const sanitized = fileName
            .replace(/[^a-zA-Z0-9._-]/g, '_')
            .replace(/_{2,}/g, '_')
            .replace(/^_+|_+$/g, '')
            .toLowerCase();

        // Ensure we have a valid filename
        if (sanitized.length === 0) {
            return 'unnamed_file';
        }

        // Prevent hidden files
        if (sanitized.startsWith('.')) {
            return 'file' + sanitized;
        }

        return sanitized;
    } catch (error) {
        logger.error('Filename sanitization failed', error instanceof Error ? error : undefined, {
            inputLength: fileName.length
        });
        return 'unnamed_file';
    }
}

// URL sanitization
export function sanitizeUrl(url: string): string | null {
    if (!isString(url)) {
        logger.warn('Invalid input for URL sanitization', {
            inputType: typeof url
        });
        return null;
    }

    try {
        const parsed = new URL(url.trim());

        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            logger.warn('Suspicious URL protocol detected', {
                protocol: parsed.protocol,
                url: url.substring(0, 50)
            });
            return null;
        }

        return parsed.toString();
    } catch (error) {
        logger.warn('Invalid URL format', {
            url: url.substring(0, 50),
            error: error instanceof Error ? error.message : 'Unknown error'
        });
        return null;
    }
}

// Phone number sanitization
export function sanitizePhoneNumber(phone: string): string {
    if (!isString(phone)) {
        logger.warn('Invalid input for phone sanitization', {
            inputType: typeof phone
        });
        return '';
    }

    try {
        return phone.replace(/[^+\d]/g, '');
    } catch (error) {
        logger.error(
            'Phone number sanitization failed',
            error instanceof Error ? error : undefined,
            {
                inputLength: phone.length
            }
        );
        return '';
    }
}

// Email sanitization
export function sanitizeEmail(email: string): string {
    if (!isString(email)) {
        logger.warn('Invalid input for email sanitization', {
            inputType: typeof email
        });
        return '';
    }

    try {
        return email.toLowerCase().trim();
    } catch (error) {
        logger.error('Email sanitization failed', error instanceof Error ? error : undefined, {
            inputLength: email.length
        });
        return '';
    }
}

// Generic object sanitization with proper typing
export function sanitizeObject<T extends Record<string, unknown>>(
    obj: T,
    options: SanitizeObjectOptions = {},
    currentDepth: number = 0
): T {
    if (!isObject(obj)) {
        logger.warn('Invalid input for object sanitization', {
            inputType: typeof obj
        });
        return {} as T;
    }

    const maxDepth = options.maxDepth || 10;
    if (currentDepth >= maxDepth) {
        logger.warn('Maximum depth reached during object sanitization', {
            currentDepth,
            maxDepth
        });
        return {} as T;
    }

    try {
        const sanitized = {} as T;

        for (const [key, value] of Object.entries(obj)) {
            // Type-safe key validation
            if (!isString(key)) {
                logger.warn('Non-string key found during sanitization', {
                    keyType: typeof key
                });
                continue;
            }

            // Skip if key not in allowed list
            if (options.allowedKeys && !options.allowedKeys.includes(key)) {
                continue;
            }

            if (isString(value)) {
                let sanitizedValue = value;

                if (options.sanitizeStrings) {
                    sanitizedValue = sanitizeUserInput(sanitizedValue);
                }

                if (options.stripHtml) {
                    sanitizedValue = stripAllTags(sanitizedValue);
                }

                sanitized[key as keyof T] = sanitizedValue as T[keyof T];
            } else if (isArray(value)) {
                // Handle arrays
                const sanitizedArray = value.map((item) => {
                    if (isString(item)) {
                        let sanitizedItem = item;
                        if (options.sanitizeStrings) {
                            sanitizedItem = sanitizeUserInput(sanitizedItem);
                        }
                        if (options.stripHtml) {
                            sanitizedItem = stripAllTags(sanitizedItem);
                        }
                        return sanitizedItem;
                    } else if (isObject(item)) {
                        return sanitizeObject(item, options, currentDepth + 1);
                    }
                    return item;
                });
                sanitized[key as keyof T] = sanitizedArray as T[keyof T];
            } else if (isObject(value)) {
                // Recursively sanitize nested objects
                sanitized[key as keyof T] = sanitizeObject(
                    value,
                    options,
                    currentDepth + 1
                ) as T[keyof T];
            } else if (isPrimitive(value)) {
                // Keep primitive values as-is
                sanitized[key as keyof T] = value as T[keyof T];
            } else {
                logger.warn('Unsupported value type during sanitization', {
                    key,
                    valueType: typeof value
                });
            }
        }

        return sanitized;
    } catch (error) {
        logger.error('Object sanitization failed', error instanceof Error ? error : undefined, {
            objectKeys: Object.keys(obj).length,
            currentDepth
        });
        return {} as T;
    }
}

// Content Security Policy helpers
export function generateNonce(): string {
    try {
        const nonce = crypto.randomBytes(16).toString('base64');

        logger.debug('CSP nonce generated', {
            nonceLength: nonce.length
        });

        return nonce;
    } catch (error) {
        logger.error('Nonce generation failed', error instanceof Error ? error : undefined);
        // Fallback nonce
        return Buffer.from(Date.now().toString()).toString('base64');
    }
}

export function getCSPDirectives(nonce: string, customDirectives?: Partial<CSPDirectives>): string {
    if (!isString(nonce) || nonce.length === 0) {
        logger.warn('Invalid nonce provided for CSP directives', {
            nonceType: typeof nonce,
            nonceLength: isString(nonce) ? nonce.length : 0
        });
        nonce = generateNonce();
    }

    try {
        const defaultDirectives: CSPDirectives = {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            fontSrc: ["'self'", 'https:'],
            connectSrc: ["'self'", 'https:'],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            upgradeInsecureRequests: true
        };

        // Merge with custom directives
        const directives = { ...defaultDirectives, ...customDirectives };

        const cspParts: string[] = [];

        for (const [key, value] of Object.entries(directives)) {
            if (key === 'upgradeInsecureRequests' && value === true) {
                cspParts.push('upgrade-insecure-requests');
            } else if (isArray(value) && value.length > 0) {
                const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                cspParts.push(`${kebabKey} ${value.join(' ')}`);
            }
        }

        const cspHeader = cspParts.join('; ');

        logger.debug('CSP directives generated', {
            directiveCount: cspParts.length,
            headerLength: cspHeader.length
        });

        return cspHeader;
    } catch (error) {
        logger.error('CSP directive generation failed', error instanceof Error ? error : undefined);

        // Fallback CSP
        return [
            "default-src 'self'",
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' https:",
            "connect-src 'self' https:",
            "frame-src 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'"
        ].join('; ');
    }
}

// Type-safe sanitization functions (no generic issues)
export function sanitizeString(
    data: string,
    options: { sanitizeStrings?: boolean; stripHtml?: boolean } = {}
): string {
    if (!isString(data)) {
        logger.warn('Invalid input for string sanitization', {
            inputType: typeof data
        });
        return '';
    }

    let result = data;
    if (options.sanitizeStrings) {
        result = sanitizeUserInput(result);
    }
    if (options.stripHtml) {
        result = stripAllTags(result);
    }
    return result;
}

export function sanitizeStringArray(
    data: string[],
    options: { sanitizeStrings?: boolean; stripHtml?: boolean } = {}
): string[] {
    if (!isArray(data)) {
        logger.warn('Invalid input for string array sanitization', {
            inputType: typeof data
        });
        return [];
    }

    return data.map((item) => {
        if (isString(item)) {
            return sanitizeString(item, options);
        }
        return '';
    });
}

// Form data sanitization
export function sanitizeFormData<T extends Record<string, string | string[] | undefined>>(
    formData: T,
    options: SanitizeObjectOptions = { sanitizeStrings: true, stripHtml: true }
): T {
    if (!isObject(formData)) {
        logger.warn('Invalid input for form data sanitization', {
            inputType: typeof formData
        });
        return {} as T;
    }

    const sanitized = {} as T;

    for (const [key, value] of Object.entries(formData)) {
        const typedKey = key as keyof T;

        if (value === undefined) {
            // Explicitly handle undefined values with proper type assertion
            sanitized[typedKey] = undefined as T[keyof T];
        } else if (isString(value)) {
            const sanitizedValue = sanitizeString(value, options);
            sanitized[typedKey] = sanitizedValue as T[keyof T];
        } else if (isArray(value)) {
            const sanitizedArray = value.map((v) => (isString(v) ? sanitizeString(v, options) : v));
            sanitized[typedKey] = sanitizedArray as T[keyof T];
        } else {
            // Handle other value types (null, etc.)
            sanitized[typedKey] = value as T[keyof T];
        }
    }

    return sanitized;
}
// Contact form specific sanitization
export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    subject?: string;
    honeypot?: string;
}

export function sanitizeContactForm(data: ContactFormData): ContactFormData {
    return {
        name: sanitizeString(data.name, { sanitizeStrings: true, stripHtml: true }),
        email: sanitizeEmail(data.email),
        message: sanitizeString(data.message, { sanitizeStrings: true, stripHtml: true }),
        ...(data.subject && {
            subject: sanitizeString(data.subject, { sanitizeStrings: true, stripHtml: true })
        }),
        ...(data.honeypot !== undefined && {
            honeypot: sanitizeString(data.honeypot || '', {
                sanitizeStrings: true,
                stripHtml: true
            })
        })
    };
}

// User registration form sanitization
export interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    terms: boolean;
    honeypot?: string;
}

export function sanitizeUserRegistration(data: UserRegistrationData): UserRegistrationData {
    return {
        firstName: sanitizeString(data.firstName, { sanitizeStrings: true, stripHtml: true }),
        lastName: sanitizeString(data.lastName, { sanitizeStrings: true, stripHtml: true }),
        email: sanitizeEmail(data.email),
        password: data.password, // Don't sanitize passwords
        terms: Boolean(data.terms),
        ...(data.honeypot !== undefined && {
            honeypot: sanitizeString(data.honeypot || '', {
                sanitizeStrings: true,
                stripHtml: true
            })
        })
    };
}

// Validation helpers
export function isSafeString(input: string): boolean {
    if (!isString(input)) return false;

    const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:text\/html/i,
        /vbscript:/i
    ];

    return !dangerousPatterns.some((pattern) => pattern.test(input));
}

export function isSafeUrl(url: string): boolean {
    if (!isString(url)) return false;

    try {
        const parsed = new URL(url);
        return ['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

export function isSafeEmail(email: string): boolean {
    if (!isString(email)) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !email.includes('<') && !email.includes('>');
}

// Data masking for logs
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
    if (!isString(data)) return '';

    if (data.length <= visibleChars) {
        return '*'.repeat(data.length);
    }

    return data.substring(0, visibleChars) + '*'.repeat(data.length - visibleChars);
}

// Email masking
export function maskEmail(email: string): string {
    if (!isString(email)) return '';

    const [local, domain] = email.split('@');
    if (!local || !domain) return email;

    const maskedLocal =
        local.length > 2
            ? local.substring(0, 2) + '*'.repeat(local.length - 2)
            : '*'.repeat(local.length);

    return `${maskedLocal}@${domain}`;
}

export function sanitizeEmailTags(tags: string[]): string[] {
    if (!isArray(tags)) {
        logger.warn('Invalid input for email tag sanitization', {
            inputType: typeof tags
        });
        return [];
    }

    try {
        const sanitized = tags
            .map((tag) => {
                if (!isString(tag)) {
                    logger.warn('Non-string tag found during sanitization', {
                        tagType: typeof tag
                    });
                    return '';
                }

                // Convert to ASCII-compatible format for Resend API
                return tag
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-zA-Z0-9_-]/g, '_') // Replace non-ASCII chars with underscore
                    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
                    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
                    .substring(0, 50); // Limit length
            })
            .filter((tag) => tag.length > 0) // Remove empty tags
            .slice(0, 10); // Limit number of tags
        return sanitized;
    } catch (error) {
        logger.error('Email tag sanitization failed', error instanceof Error ? error : undefined, {
            tagsCount: tags.length
        });
        return [];
    }
}

// Validate email tag format for Resend API
export function isValidEmailTag(tag: string): boolean {
    if (!isString(tag)) return false;

    // Resend API requirements: ASCII letters, numbers, underscores, or dashes only
    const tagRegex = /^[a-zA-Z0-9_-]+$/;
    return tagRegex.test(tag) && tag.length > 0 && tag.length <= 50;
}

// Email template data sanitization
export interface EmailTemplateData {
    [key: string]: string | number | boolean | undefined;
}

export function sanitizeEmailTemplateData(data: EmailTemplateData): EmailTemplateData {
    if (!isObject(data)) {
        logger.warn('Invalid input for email template data sanitization', {
            inputType: typeof data
        });
        return {};
    }

    const sanitized: EmailTemplateData = {};

    for (const [key, value] of Object.entries(data)) {
        if (isString(value)) {
            // For email templates, we want to preserve some HTML but sanitize dangerous content
            sanitized[key] = sanitizeHtml(value, {
                allowedTags: ['strong', 'em', 'u', 'br', 'p', 'a'],
                allowedAttributes: {
                    a: ['href', 'title']
                }
            });
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            sanitized[key] = value;
        } else if (value === undefined) {
            sanitized[key] = undefined;
        } else {
            logger.warn('Unsupported value type in email template data', {
                key,
                valueType: typeof value
            });
            sanitized[key] = String(value);
        }
    }

    return sanitized;
}
