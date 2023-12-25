let taxasCache: { selic: number; ipca: number } | null = null;

export function setTaxaSelic(selic: number): void {
	taxasCache = taxasCache || { selic: 0, ipca: 0 };
	taxasCache.selic = selic;
	console.log(`Taxa SELIC definida como: ${selic}`);
}

export function setTaxaIPCA(ipca: number): void {
	taxasCache = taxasCache || { selic: 0, ipca: 0 };
	taxasCache.ipca = ipca;
	console.log(`Taxa IPCA definida como: ${ipca}`);
}

export function getTaxas(): { selic: number; ipca: number } | null {
	return taxasCache;
}
