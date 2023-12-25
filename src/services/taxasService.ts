import { fetchTaxasBCB } from "../integrations/fetcherBCB.ts";
import * as TaxasCacheService from "../middleware/taxasCacheMiddleware.ts";

export async function fetchTaxas() {
	
	const cachedTaxas = TaxasCacheService.getTaxas();
	
	if (cachedTaxas) {
		return cachedTaxas;
	} else {
		await fetchTaxasBCB();
		return TaxasCacheService.getTaxas() || { selic: 0, ipca: 0 };
	}
}
