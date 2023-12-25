import { Router, Context } from 'https://deno.land/x/oak/mod.ts';
import { fetchTaxas } from '../services/taxasService.ts';
import { formatIPCA, formatSelic } from '../utils/formatter.ts';

const router = new Router();

router.get('/api/taxas', async (context: Context) => {
	try {
		const taxas = await fetchTaxas();

		const formattedSelic = taxas.selic !== null ? formatSelic(taxas.selic) : 'SELIC Indisponível';
		const formattedIPCA = taxas.ipca !== null ? formatIPCA(taxas.ipca) : 'IPCA Indisponível';

		context.response.body = { selic: formattedSelic, ipca: formatIPCA(taxas.ipca), status: 200 };

	} catch (error) {
		console.error('Erro ao obter as taxas:', error);
		context.response.body = { error: 'Não foi possível obter as taxas.' };
		context.response.status = 500;
	}
});

export { router as taxasController };
