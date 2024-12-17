import secureWords from '../../lib/db/secure-words';

export interface GetSecureWordResponse {
	success: boolean;
	message: string;
	data: {
		username: string;
		secureWord: string;
	}
};

export async function GET(req: Request): Promise<Response> {
  try {
		const { searchParams } = new URL(req.url);
		const username = searchParams.get('username');

		const secureWord: string = secureWords[Math.floor(Math.random() * secureWords.length)];

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Get secure word successful',
				data: {
					username: username,
					secureWord: secureWord
				}
			} as GetSecureWordResponse),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);

	} catch (error) {
		throw error;
	}
}