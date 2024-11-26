import crypto from 'crypto';

// In-memory storage for tokens. Replace with a database in production.
const tokenStorage = new Map();

/**
 * Generate a secure random token.
 * @returns {string} A 64-character token.
 */
function generateToken() {
  return crypto.randomBytes(32).toString('hex'); // Generates a 64-character token
}

/**
 * Create a token and save it with a 24-hour expiration.
 * @returns {string} The generated token.
 */
export function createToken() {
  // In your token generation and storage function
  const token = generateToken();
  const expiryTime = Date.now() + 24 * 60 * 60 * 1000;  // 24 hours from now

  console.log(`Generated token: ${token}, Expiry time: ${expiryTime}`);
  tokenStorage.set(token, expiryTime);

  // Log the storage after setting
  console.log('Current token storage:', Array.from(tokenStorage.entries()));
  return token;
}

/**
 * Verify if a token is valid and not expired.
 * @param {string} token - The token to verify.
 * @returns {boolean} True if the token is valid, otherwise false.
 */
// Assuming tokenStorage is a Map or similar object
export function verifyToken(token) {
  console.log('Verifying token:', token);

  if (!tokenStorage.has(token)) {
    console.log('Token does not exist in storage');
    return false; // Token does not exist
  }

  const expiryTime = tokenStorage.get(token);
  console.log('Token expiry time:', expiryTime);

  // Check if the token has expired
  if (Date.now() > expiryTime) {
    console.log('Token has expired');
    tokenStorage.delete(token); // Remove expired token
    return false;
  }

  // Token is valid and within expiry
  tokenStorage.delete(token); // Use-once token policy
  console.log('Token is valid and has been used');
  return true;
}
