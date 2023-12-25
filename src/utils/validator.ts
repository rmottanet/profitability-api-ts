// valida taxas entre .01% e 999.99%
export function validatePositiveNumber(name: string, value: string): number {
	const isPositiveNumber = /^\d{1,3}(\.\d{1,2})?$/.test(value);
	
	if (!isPositiveNumber) {
		throw new Error(`Parâmetro ${name} deve ser um número entre 1 e 999.99.`);
	}
	
	const parsedValue = parseFloat(value);
	
	if (isNaN(parsedValue) || parsedValue <= 0) {
		throw new Error(`Parâmetro ${name} deve ser um número positivo.`);
	}
	
	return parsedValue;
}

// valida prazo entre 1 e 9999 dias
export function validatePositiveInteger(name: string, value: string): number {
	const isPositiveInteger = /^\d{1,4}$/.test(value);
	
	if (!isPositiveInteger) {
		throw new Error(`Parâmetro ${name} deve ser um número entre 1 e 9999.`);
	}
	
	const parsedValue = parseInt(value, 10);
	
	if (isNaN(parsedValue) || parsedValue <= 0) {
		throw new Error(`Parâmetro ${name} deve ser um número inteiro positivo.`);
	}
	
	return parsedValue;
}
