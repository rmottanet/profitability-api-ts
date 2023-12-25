export async function fetcher(url: string): Promise<Response> {
	
	try {
		
		const response = await fetch(url);
		
		if (!response.ok) {
			throw new Error(`Falha na resposta da API. Status: ${response.status}`);
		}
		
		return response;
		
	} catch (error) {
		console.error('Erro na requisição:', error);
		throw error;
	}
}
