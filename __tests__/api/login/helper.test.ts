import { generateMockJWT } from '../../../app/api/login/helper';

describe('login helper functions', () => {
  describe('generateMockJWT', () => {
    it('should generate a mock JWT with the correct structure', () => {
      const username = 'testUser';
      const jwt = generateMockJWT(username);
  
      const jwtParts = jwt.split('.');
  
      expect(jwtParts).toHaveLength(3);
  
      const [encodedHeader, encodedPayload, signature] = jwtParts;
  
      const decodedHeader = JSON.parse(Buffer.from(encodedHeader, 'base64url').toString('utf-8'));
      const decodedPayload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf-8'));
  
      expect(decodedHeader).toEqual({
        alg: 'HS256',
        typ: 'JWT',
      });
  
      expect(decodedPayload).toMatchObject({
        sub: '1234567890',
        name: username,
      });

      expect(typeof decodedPayload.iat).toBe('number');
  
      expect(signature).toBe('mockSignature');
    });
  });
});
