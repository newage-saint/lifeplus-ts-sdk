/**
 * Helper functions for working with the LifePlus SDK
 */

/**
 * Safely get a string value, returns empty string if null or undefined
 */
export function stringOrEmpty(value?: string | null): string {
    return value ?? '';
}

/**
 * Safely get a number value, returns 0 if null or undefined
 */
export function numberOrZero(value?: number | null): number {
    return value ?? 0;
}

/**
 * Safely get a boolean value, returns false if null or undefined
 */
export function boolOrFalse(value?: boolean | null): boolean {
    return value ?? false;
}

/**
 * Format Bangladeshi phone number
 */
export function formatPhone(phone: string): string {
    // Remove spaces, dashes, and other non-numeric characters
    let cleaned = phone.replace(/[^0-9]/g, '');
    
    // Remove country code if present
    if (cleaned.startsWith('880')) {
        cleaned = cleaned.substring(3);
    }
    
    // Ensure it starts with 0
    if (!cleaned.startsWith('0')) {
        cleaned = '0' + cleaned;
    }
    
    return cleaned;
}

/**
 * Format price in BDT currency
 */
export function formatPrice(amount: number, showCurrency: boolean = true): string {
    const formatted = amount.toFixed(2);
    return showCurrency ? `BDT ${formatted}` : formatted;
}

/**
 * Format date to ISO string
 */
export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Format datetime to ISO string
 */
export function formatDateTime(date: Date): string {
    return date.toISOString();
}

/**
 * Parse ISO date string to Date object
 */
export function parseDate(dateString: string): Date {
    return new Date(dateString);
}

/**
 * Check if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

/**
 * Get nested property from object safely
 */
export function getNestedProperty<T>(obj: any, path: string, defaultValue?: T): T | undefined {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key];
        } else {
            return defaultValue;
        }
    }
    
    return result as T;
}

/**
 * Delay execution for specified milliseconds
 */
export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry an async function with exponential backoff
 */
export async function retry<T>(
    fn: () => Promise<T>,
    options: {
        maxAttempts?: number;
        delayMs?: number;
        backoffMultiplier?: number;
    } = {}
): Promise<T> {
    const maxAttempts = options.maxAttempts ?? 3;
    const delayMs = options.delayMs ?? 1000;
    const backoffMultiplier = options.backoffMultiplier ?? 2;
    
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;
            
            if (attempt < maxAttempts) {
                const waitTime = delayMs * Math.pow(backoffMultiplier, attempt - 1);
                await delay(waitTime);
            }
        }
    }
    
    throw lastError!;
}

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Validate Bangladeshi phone number
 */
export function isValidPhone(phone: string): boolean {
    const cleaned = formatPhone(phone);
    return /^01[3-9]\d{8}$/.test(cleaned);
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Truncate string to specified length
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    waitMs: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    
    return function(this: any, ...args: Parameters<T>) {
        const context = this;
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, waitMs);
    };
}

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limitMs: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false;
    
    return function(this: any, ...args: Parameters<T>) {
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limitMs);
        }
    };
}
