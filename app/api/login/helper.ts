export const generateMockJWT = (username: string): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    sub: '1234567890',
    name: username,
    iat: Math.floor(Date.now() / 1000)
  };

  const encode = (obj: object): string => {
    return Buffer.from(JSON.stringify(obj)).toString('base64url');
  };

	const encodedHeader = encode(header);
	const encodedPayload = encode(payload);

  const mockSignature = 'mockSignature';

  const jwt = `${encodedHeader}.${encodedPayload}.${mockSignature}`;
	
  return jwt;
}