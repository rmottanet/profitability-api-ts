import { aliquotIR } from "./tributeService.ts";

/**
 * Calcula rentabilidade líquida aproximada em contratos de CDB Pré-fixado.
 * 
 * @param {number} rate - Taxa bruta do contrato.
 * @param {number} term - Período do contrato em dias. 
 */
export function calcCDBPRE(rate: number, term: number) {
  
	try {
		
		const IR = aliquotIR(term);
		const profit = rate * (1 - IR);
		return { profit, IR };
		
	} catch (error) {
		console.error("Erro ao calcular CDB Pré:", error);
		throw error;
	}
}
