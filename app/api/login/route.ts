import { generateMockJWT } from './helper';

export interface LoginResponse {
	success: boolean;
	message: string;
	data: {
		username: string;
		token: string;
	}
};

export async function POST(req: Request): Promise<Response> {
	try {
		const { username, password } = await req.json();

		if (!username || !password) {
			return new Response(
				JSON.stringify({
					success: false,
					message: 'Username or password is missing',
					data: null,
				}),
				{
					status: 422,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Login successful',
				data: {
					username: username,
					token: generateMockJWT(username)
				}
			} as LoginResponse),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);

		} catch (error) {
			throw error;
		}
  }