import * as TaxasCacheService from "../middleware/taxasCacheMiddleware.ts";

/**
 * Calcula taxa proporcional em relação a SELIC.
 * 
 * @param {number} rate - Taxa bruta do contrato.
 */
export function calcProp(rate: number) {
	
	try {
		
		const taxas = TaxasCacheService.getTaxas();
		
		if (taxas === null) {
		  throw new Error("Taxas não disponíveis.");
		}
		
		const profit = rate * taxas.selic;
		return { profit };
		
	} catch (error) {
		console.error("Erro interno ao calcular prop:", error);
		throw error;
	}
}
