import { SELIC_URL, IPCA_URL } from "./urls.ts";
import { fetcher } from "../utils/fetcher.ts";
import * as TaxasCacheService from "../middleware/taxasCacheMiddleware.ts";

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

export async function fetchTaxasBCB() {
	
	try {
		
		const selicResponse = await fetcher(SELIC_URL);
		const ipcaResponse = await fetcher(IPCA_URL);
		
		let selic = 0;
		let ipca = 0;
		
		if (selicResponse.ok) {
			const selicData = await selicResponse.json();
			selic = parseFloat(selicData[0].valor) / 100;
		} else {
			console.error('Falha na resposta da API para SELIC. Recuperando valor do cache.');
			selic = TaxasCacheService.getTaxaSelic() || 0;
		}
		
		if (ipcaResponse.ok) {
			const ipcaData = await ipcaResponse.json();
			ipca = parseFloat(
				ipcaData.reduce((acc, data) => acc + parseFloat(data.valor), 0)
			);
		} else {
			console.error('Falha na resposta da API para IPCA. Recuperando valor do cache.');
			ipca = TaxasCacheService.getTaxaIPCA() || 0;
		}
		
		// atualize o cache independentemente das respostas
		TaxasCacheService.setTaxaSelic(selic);
		TaxasCacheService.setTaxaIPCA(ipca);
		
		// agende a próxima atualização após o tempo de vida do cache
		setTimeout(fetchTaxasBCB, CACHE_TTL_MS);
		
	} catch (error) {
		console.error('Erro na requisição de taxas:', error);
		// recuperando valores do cache em caso de erro
		selic = TaxasCacheService.getTaxaSelic() || 0;
		ipca = TaxasCacheService.getTaxaIPCA() || 0;
	}
}
