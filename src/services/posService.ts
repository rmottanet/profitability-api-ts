import * as TaxasCacheService from "../middleware/taxasCacheMiddleware.ts";
import { aliquotIR } from "./tributeService.ts";

/**
 * Calcula rentabilidade líquida aproximada em contratos de CDB Pós fixado.
 * 
 * @param {number} rate - Taxa bruta do contrato.
 * @param {number} term - Período do contrato em dias.
 */
export function calcCDBPOS(rate: number, term: number) {
	
	try {
		
		const taxas = TaxasCacheService.getTaxas();
		
		if (taxas === null) {
		  throw new Error("Taxas não disponíveis.");
		}

		const IR = aliquotIR(term);
		const profit = rate * taxas.selic * (1 - IR);
		return { profit, IR };
		
	} catch (error) {
		console.error("Erro ao calcular CDB Pós:", error);
		throw error;
	}
}
