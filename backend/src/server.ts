import { serverHttp } from "./app";

// Executar a aplicação na PORT que eu definir
serverHttp.listen(4000, () => console.log("Server is running on PORT: 4000"));
