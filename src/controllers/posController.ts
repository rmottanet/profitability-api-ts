import { Router, Context } from "https://deno.land/x/oak/mod.ts";
import { validatePositiveNumber, validatePositiveInteger } from "../utils/validator.ts";
import * as PosService from "../services/posService.ts";
import { formatIR, formatProfit } from '../utils/formatter.ts';

const router = new Router();

router.get("/api/pos", async (ctx: Context) => {
	
	try {
		
		const rate = validatePositiveNumber("rate", ctx.request.url.searchParams.get("rate") || "0");
		const term = validatePositiveInteger("term", ctx.request.url.searchParams.get("term") || "0");
		
		const posResult = PosService.calcCDBPOS(rate, term);
		
		ctx.response.body = { liquid: formatProfit(posResult.profit), tribute: formatIR(posResult.IR), status: 200 };
		
	} catch (error) {
		console.error("Erro ao calcular CDB Pós:", error);
		ctx.response.status = 400;
		ctx.response.body = { error: error.message };
	}
});

export { router as posController };
