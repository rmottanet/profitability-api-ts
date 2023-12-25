import { Router, Context } from "https://deno.land/x/oak/mod.ts";
import { validatePositiveNumber } from "../utils/validator.ts";
import * as PropService from "../services/propService.ts";

const router = new Router();

router.get("/api/prop", async (ctx: Context) => {
	try {
		
		const rate = validatePositiveNumber("rate", ctx.request.url.searchParams.get("rate") || "0");
		
		const propResult = PropService.calcProp(rate);
		
		ctx.response.body = { prop: propResult.profit.toFixed(2) + "%", status: 200 };
		
	} catch (error) {
		console.error("Erro ao calcular valor proporcional:", error);
		ctx.response.status = 400;
		ctx.response.body = { error: error.message };
	}
});

export { router as propController };
