import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Application, RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { taxasController } from './controllers/taxasController.ts';
import { propController } from './controllers/propController.ts';
import { preController } from './controllers/preController.ts';
import { posController } from './controllers/posController.ts';
import { ipcaController } from './controllers/ipcaController.ts';
import * as TaxasService from './services/taxasService.ts';

const app = new Application();

app.use(oakCors({
	origin: "https://rmottanet.github.io/profitability/"
}));

app.use(async (ctx, next) => {
	ctx.response.headers.set("max-conn", "100"); 
	await next();
});

app.use(async (ctx, next) => {
	ctx.response.headers.set("Strict-Transport-Security", "max-age=31536000");
	await next();
});

// inicializa taxas no cache
await TaxasService.fetchTaxas();

app.use(taxasController.routes());
app.use(propController.routes());
app.use(preController.routes());
app.use(posController.routes());
app.use(ipcaController.routes());


app.use(async (ctx: RouterContext) => {
	
	ctx.response.headers.set('Content-Type', 'text/html');
	
	ctx.response.body = `
		<!DOCTYPE HTML>
		<html lang="en">
			<head>
    			<meta charset="UTF-8">
				<title>Profitability API</title>
			</head>
			<body>
				<h1>Saudações</h1>
				<p>Profitability API - Cálculos de Rentabilidade em Renda Fixa.</p>
				<p> Docs: <a href="https://rmottanet.gitbook.io/profitability/">https://rmottanet.gitbook.io/profitability/</a>
			</body>
		</html>
	`;
});


const PORT = Deno.env.get('PORT') || '8000';

console.log(`Server running on http://localhost:${PORT}`);

await app.listen({ port: parseInt(PORT) });
