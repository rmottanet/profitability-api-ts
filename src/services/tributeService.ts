/**
 * Calcula alíquota do Imposto de Renda.
 * 
 * @param {number} term - Período do contrato em dias.
 */
export function aliquotIR(term: number) {
	const taxRanges = {
		0: { upperBound: 180, taxRate: 0.225 },
		1: { upperBound: 360, taxRate: 0.20 },
		2: { upperBound: 720, taxRate: 0.175 },
		3: { upperBound: Infinity, taxRate: 0.15 },
	};
	
	try {
		const selectedRange = Object.values(taxRanges).find(
		  ({ upperBound }) => term <= upperBound
		);
		
		const taxRate = selectedRange?.taxRate || 0.15;
		
		return taxRate;
	} catch (error) {
		console.error("Erro ao calcular IR:", error);
		throw error;
	}
}
