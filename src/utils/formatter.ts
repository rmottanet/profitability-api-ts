export function formatIR(value: number): string {
	return value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatProfit(value: number): string {
	return value.toFixed(2) + '%';
}

export function formatSelic(value: number): string {
	return value.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatIPCA(value: number): string {
	return value.toFixed(2) + '%';
}
