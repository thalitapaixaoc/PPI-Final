import express from "express";
import session from "express-session"
import cookieParser from "cookie-parser";
const host = "localhost";
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(session(
{
    secret: "M1NH4CH4V3S3CR3T4S2",
    resave: false,
    saveUninitialized: false,
    cookie: 
    { 
        maxAge: 1000*60*30, //30 minutos de duração
        httpOnly: true,
        secure: false
    }   
}));


var ListaEquipes = [];
app.use(cookieParser());
app.get("/", VerificarAutenticacao, (Requisicao, Resposta) => 
{
    const UltimoLogin = Requisicao.cookies.UltimoLogin;
    Resposta.send(`<html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>VôleiManager</title>
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" style="padding: 10px 30px;">
                        <div class="container-fluid justify-content-start">
                            <a class="navbar-brand fw-bold" href="/">
                                🏐 VôleiManager
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse " id="navbarNavDropdown">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                                    <li class="nav-item">
                                        <a class="nav-link" href="/">Início</a>
                                    </li>

                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Cadastro
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-dark ">
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarEquipes">Cadastrar Equipes</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarJogadores">Cadastrar Jogadores</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link" href="/ListaEquipes">Lista de Equipes</a>
                                    </li>

                                    <div class="d-flex align-items-center">
                                    <span class="navbar-text me-3 text-white">
                                        ${UltimoLogin ? `Último Login: ${UltimoLogin}` : ''}
                                    </span>
                                    <a class="btn btn-outline-danger btn-sm" href="/Logout">Sair</a>
                                </div>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <!--<div class="container">
                        <img src="https://www.unoeste.br/fipp/Content/imagens/logo-fipp-512x200.png" alt="Vôlei" style="width: 600px; display: block; margin: 0 auto;">
                        <br>
                        <h1 style="text-align: center;">Bem-vindo ao VôleiManager</h1>
                        <p style="text-align: center;">Gerencie suas equipes e Jogadores de vôlei com facilIdade.</p>
                        <div class="text-center">
                            <a class="btn btn-success btn-lg" href="/CadastrarEquipes">Cadastrar Equipes</a>
                            <a class="btn btn-success btn-lg" href="/CadastrarJogadores">Cadastrar Jogadores</a>
                            <a class="btn btn-danger btn-lg" href="/ListaEquipes">Ver Lista de Equipes</a>
                        </div>-->
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`);
    Resposta.end();
});
app.get("/CadastrarEquipes",VerificarAutenticacao, (Requisicao,Resposta) => 
{
    const UltimoLogin = Requisicao.cookies.UltimoLogin;
    Resposta.send(
    `<html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <title>VôleiManager</title>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" style="padding: 10px 30px;">
                        <div class="container-fluid justify-content-start">
                            <a class="navbar-brand fw-bold" href="/">
                                🏐 VôleiManager
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse " id="navbarNavDropdown">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link" href="/">Início</a>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Cadastro
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-dark">
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarEquipes">Cadastrar Equipes</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarJogadores">Cadastrar Jogadores</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/ListaEquipes">Lista de Equipes</a>
                                    </li>
                                    <div class="d-flex align-items-center">
                                    <span class="navbar-text me-3 text-white">
                                        ${UltimoLogin ? `Último Login: ${UltimoLogin}` : ''}
                                    </span>
                                    <a class="btn btn-outline-danger btn-sm" href="/Logout">Sair</a>
                                </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
            <div class="container">
                <h1 style ="text-align: center"> Cadastro de Equipes </h1>
                <form name="formulario" id="formulario" method="post" action="/CadastrarEquipes" >
                    <div class="form-floating mb-3">
                        <input id="EquipeNome" name="EquipeNome" type="text" class="form-control" placeholder="Nome da Equipe">
                        <label for="EquipeNome">Nome da Equipe</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input id="TecnicoNome" name="TecnicoNome" type="text" class="form-control" placeholder="Nome do Técnico">
                        <label for="TecnicoNome">Nome do Técnico</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input id="TecnicoTelefone" name="TecnicoTelefone" type="tel" maxlength="11" class="form-control" placeholder="Telefone do Técnico">
                        <label for="TecnicoTelefone">Telefone do Técnico</label>
                    </div>
                    <div style="text-align: center;">
                        <button type="submit" class="btn btn-success btn-lg">Cadastrar</button>
                        <a class="btn btn-danger btn-lg" href="/">Cancelar</a>
                    </div>
                </form>
            </div>

        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </html>
        `);
    Resposta.end();
});
app.post("/CadastrarEquipes",VerificarAutenticacao, (Requisicao, Resposta) => 
{
    const EquipeNome = Requisicao.body.EquipeNome;
    const TecnicoTelefone = Requisicao.body.TecnicoTelefone;
    const TecnicoNome = Requisicao.body.TecnicoNome;
    if(EquipeNome && TecnicoNome && TecnicoTelefone && TecnicoTelefone.length==11)
    {
        ListaEquipes.push(
        {
            EquipeNome: EquipeNome,
            TecnicoNome: TecnicoNome,
            TecnicoTelefone: TecnicoTelefone
        });
        Resposta.redirect("/ListaEquipes");
    }
    else
    {
        const UltimoLogin = Requisicao.cookies.UltimoLogin;
        let Conteudo = `<html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <title>VôleiManager</title>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" style="padding: 10px 30px;">
                        <div class="container-fluid justify-content-start">
                            <a class="navbar-brand fw-bold" href="/">
                                🏐 VôleiManager
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse " id="navbarNavDropdown">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                                    <li class="nav-item">
                                        <a class="nav-link" href="/">Início</a>
                                    </li>

                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Cadastro
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-dark">
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarEquipes">Cadastrar Equipes</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarJogadores">Cadastrar Jogadores</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link" href="/ListaEquipes">Lista de Equipes</a>
                                    </li>

                                    <div class="d-flex align-items-center">
                                    <span class="navbar-text me-3 text-white">
                                        ${UltimoLogin ? `Último Login: ${UltimoLogin}` : ''}
                                    </span>
                                    <a class="btn btn-outline-danger btn-sm" href="/Logout">Sair</a>
                                </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
        <div class="container">
            <form name="formulario" id="formulario" method="post" action="/CadastrarEquipes" novalidate>
                <h1 style ="text-align: center"> Cadastro de Equipes </h1>
                `;
        if(!EquipeNome)
        {
            Conteudo +=`
                        <div>
                        <div class="form-floating  mb-0">
                            <input id="EquipeNome" name="EquipeNome" required type="text" class="form-control" placeholder="Nome da Equipe">
                            <label for="EquipeNome">Nome da Equipe</label>
                        </div>
                        <span class="text-danger">Informe o Nome da Equipe!</span></div>` ;
        }
        else
        {
            Conteudo+=`
                        <div class="form-floating  mb-3">
                            <input id="EquipeNome" name="EquipeNome" value="${EquipeNome}" required type="text" class="form-control" placeholder="Nome da Equipe">
                            <label for="EquipeNome">Nome da Equipe</label>
                        </div>`
                        ;
        
        }
        if(!TecnicoNome)
        {
            Conteudo+=`
                    <div>
                    <div class="form-floating  mb-0">
                        <input id="TecnicoNome" name="TecnicoNome" type="text" class="form-control" placeholder="Nome do Técnico">
                        <label for="TecnicoNome">Nome do Técnico</label>
                    </div>
                    <span class="text-danger">Informe o Nome do Técnico!</span></div>`;
        }
        else
        {
            Conteudo+=`
                    <div class="form-floating  mb-3">
                        <input id="TecnicoNome" name="TecnicoNome" value="${TecnicoNome}" type="tel" class="form-control" placeholder="Nome do Técnico">
                        <label for="TecnicoNome">Nome do Técnico</label>
                    </div>`;
        }
        if(TecnicoTelefone.length!=11)
        {
            Conteudo+=`
                    <div>
                    <div class="form-floating  mb-0">
                        <input id="TecnicoTelefone" name="TecnicoTelefone" maxlength="11" value="${TecnicoTelefone}" type="tel" class="form-control" placeholder="Telefone do Técnico">
                        <label for="TecnicoTelefone">Telefone do Técnico</label>
                    </div>
                    <span class="text-danger">Informe o telefone do técnico!</span></div>`;
        }
        else
        {
            Conteudo+=`
                    <div class="form-floating  mb-3">
                        <input id="TecnicoTelefone" name="TecnicoTelefone" maxlength="11" value="${TecnicoTelefone}" type="tel" class="form-control" placeholder="Telefone do Técnico">
                        <label for="TecnicoTelefone">Telefone do Técnico</label>
                    </div>`;
        }
        Conteudo+=`
                    <div style="text-align: center;">
                        <button type="submit" class="btn btn-success btn-lg">Cadastrar</button>
                        <a class="btn btn-danger btn-lg" href="/">Cancelar</a>
                    </div>
                </form>
            </div>

            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </html>`;
        Resposta.send(Conteudo);

        Resposta.end;
    };
});
app.get("/CadastrarJogadores",VerificarAutenticacao, (Requisicao,Resposta) => 
    {
    const UltimoLogin = Requisicao.cookies.UltimoLogin;

    let Conteudo =`<html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <title>VôleiManager</title>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" style="padding: 10px 30px;">
                        <div class="container-fluid justify-content-start">
                            <a class="navbar-brand fw-bold" href="/">
                                🏐 VôleiManager
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse " id="navbarNavDropdown">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                                    <li class="nav-item">
                                        <a class="nav-link" href="/">Início</a>
                                    </li>

                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Cadastro
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-dark">
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarEquipes">Cadastrar Equipes</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarJogadores">Cadastrar Jogadores</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link" href="/ListaEquipes">Lista de Equipes</a>
                                    </li>

                                    <div class="d-flex align-items-center">
                                    <span class="navbar-text me-3 text-white">
                                        ${UltimoLogin ? `Último Login: ${UltimoLogin}` : ''}
                                    </span>
                                    <a class="btn btn-outline-danger btn-sm" href="/Logout">Sair</a>
                                </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
            <div class="container">
                <h1 style ="text-align: center"> Cadastro de Jogadores </h1>
                <form name="formulario" id="formulario" method="post" action="/CadastrarJogadores" novalidate>
                    <div class="form-floating  mb-3">
                        <input id="Nome" name="Nome" type="text" class="form-control" placeholder="Nome do Jogador">
                        <label for="Nome">Nome do Jogador</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <select class="form-select" id="Sexo" name="Sexo" aria-label="Floating label select example">
                            <option selected value ="">..</option>
                            <option> Masculino </option>
                            <option> Feminino </option>
                        </select>
                        <label for="Sexo">Sexo</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <input id="Data" name="Data" type="date" class="form-control" placeholder="Data de Nascimento">
                        <label for="Data">Data de Nascimento</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <input id="Camisa" name="Camisa" type="number" maxlength="11" class="form-control" placeholder="N° Camisa">
                        <label for="Camisa">N° Camisa</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <input id="Altura" name="Altura" type="number" class="form-control" placeholder="Altura em Cm">
                        <label for="Altura">Altura em Cm</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <select class="form-select" id="Posicao" name="Posicao">
                            <option selected value ="">..</option>
                            <option>Líbero</option>
                            <option>Ponteiro</option>
                            <option>Levantador</option>
                            <option>Oposto</option>
                            <option>Central</option>
                        </select>
                        <label for="Posicao">Posição</label>
                    </div>
                    <div class="form-floating  mb-3">
                        <select class="form-select" id="OptionEquipe" name="OptionEquipe">
                            <option selected value ="">..</option>`;
                            if(ListaEquipes.length>0)
                                for( let i = 0 ; i < ListaEquipes.length ; i++ )
                                    Conteudo+=`<option> ${ListaEquipes[i].EquipeNome} </option>`;
                            Conteudo+=`
                        </select>
                        <label for="OptionEquipe">Selecione a Equipe (Caso nenhuma apareça, cadastre uma nova)</label>
                    </div>
                    <div style="text-align: center;">
                        <button type="submit" class="btn btn-success btn-lg">Cadastrar</button>
                        <a class="btn btn-danger btn-lg" href="/">Cancelar</a>
                    </div>
                </form>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    </html>
        `;
        Resposta.send(Conteudo);
    Resposta.end();
});
app.post("/CadastrarJogadores",VerificarAutenticacao,(Requisicao, Resposta) =>
{
    const Nome = Requisicao.body.Nome;
    const Sexo = Requisicao.body.Sexo;
    const Data = Requisicao.body.Data;
    const [ano,mes,dia] = Data.split("-");
    const DataBR = `${dia}/${mes}/${ano}`;
    const Camisa = Requisicao.body.Camisa;
    const Altura = Requisicao.body.Altura;
    const Posicao = Requisicao.body.Posicao;
    const OptionEquipe = Requisicao.body.OptionEquipe;
    var NumEquipe = -1;
    var Correto = true;
    var LimiteEquipe = false;

    for( let i = 0 ; i < ListaEquipes.length ; i++ )
    {
        if(ListaEquipes[i].EquipeNome == OptionEquipe)
            NumEquipe = i;
    }
    if(NumEquipe === -1)
    {
        Correto = false;
    }
    else 
        if(ListaEquipes[NumEquipe].Jogadores === undefined)
            ListaEquipes[NumEquipe].Jogadores = [];

    if(NumEquipe !== -1) 
        if(ListaEquipes[NumEquipe].Jogadores.length==6)
            LimiteEquipe = true;
    if(Camisa < 0 || Camisa > 99)
        Correto = false;
    if(Altura > 250)
        Correto = false;

    const DataNascimento = new Date(Data);
    const AtualData = new Date();
    const Idade = AtualData.getFullYear() - DataNascimento.getFullYear();
    if (Idade < 18 || Idade > 60) 
        Correto = false;

    if(OptionEquipe && Nome && Camisa && Data && Altura && Sexo && Posicao && !LimiteEquipe && Correto)
    {
        ListaEquipes[NumEquipe].Jogadores.push(
        {
            Nome: Nome,
            Sexo: Sexo,
            Data: DataBR,
            Camisa: Camisa,
            Altura: Altura,
            Posicao: Posicao
        });
        Resposta.redirect("/ListaEquipes");
    }
    else
    {
        const UltimoLogin = Requisicao.cookies.UltimoLogin;
        let Conteudo =`<html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <title>VôleiManager</title>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" style="padding: 10px 30px;">
                        <div class="container-fluid justify-content-start">
                            <a class="navbar-brand fw-bold" href="/">
                                🏐 VôleiManager
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse " id="navbarNavDropdown">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                                    <li class="nav-item">
                                        <a class="nav-link" href="/">Início</a>
                                    </li>

                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Cadastro
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-dark">
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarEquipes">Cadastrar Equipes</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarJogadores">Cadastrar Jogadores</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link" href="/ListaEquipes">Lista de Equipes</a>
                                    </li>

                                    <div class="d-flex align-items-center">
                                    <span class="navbar-text me-3 text-white">
                                        ${UltimoLogin ? `Último Login: ${UltimoLogin}` : ''}
                                    </span>
                                    <a class="btn btn-outline-danger btn-sm" href="/Logout">Sair</a>
                                </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
            <div class="container">
                <h1 style ="text-align: center"> Cadastro de Jogadores </h1>
                <form name="formulario" id="formulario" method="post" action="/CadastrarJogadores" novalidate >`;
                        if(!Nome)
                        {
                            Conteudo+=`<div>
                            <div class="form-floating  mb-0">
                                <input id="Nome" name="Nome" type="text" class="form-control"  placeholder="Nome do Jogador">
                                <label for="Nome">Nome do Jogador</label>
                            </div>
                            <span class="text-danger">Informe o Nome do jogador!</span></div>`;
                        }
                        else
                        {
                            Conteudo+=`
                            <div class="form-floating  mb-3">
                                <input id="Nome" name="Nome" type="text" value="${Nome}" class="form-control"  placeholder="Nome do Jogador">
                                <label for="Nome">Nome do Jogador</label>
                            </div>`;
                        }
                        if(!Sexo)
                        {
                            Conteudo+=`<div>
                            <div class="form-floating  mb-0">
                                <select class="form-select" id="Sexo" name="Sexo">
                                    <option selected value="">..</option>
                                    <option> Masculino </option>
                                    <option> Feminino </option>
                                </select>
                                <label for="Sexo">Sexo</label>
                            </div>
                            <span class="text-danger">Informe o gênero do jogador!</span></div>`;
                        }
                        else
                        {
                            Conteudo+=`
                            <div class="form-floating  mb-3">
                                <select class="form-select" id="Sexo" name="Sexo">
                                    <option value="">..</option>
                                    <option ${Sexo=="Masculino"? 'selected' : ''}> Masculino </option>
                                    <option ${Sexo=="Feminino"? 'selected' : ''}> Feminino </option>
                                </select>
                                <label for="Sexo">Sexo</label>
                            </div>`;
                        }
                        if(!Data || Idade < 18 || Idade > 60)
                        {
                            Conteudo+=`<div>
                            <div class="form-floating  mb-0">
                                <input id="Data" name="Data" value="${Data}" type="date" class="form-control" placeholder="Data de Nascimento">
                                <label for="Data">Data de Nascimento</label>
                            </div>
                            <span class="text-danger">Informe a data de nascimento do jogador!Entre 18 e 60 anos</span></div>`
                        }
                        else
                        {
                            Conteudo+=`
                            <div class="form-floating  mb-3">
                                <input id="Data" name="Data" type="date" value="${Data}" class="form-control" placeholder="Data de Nascimento">
                                <label for="Data">Data de Nascimento</label>
                            </div>`;
                        }
                        if(!Camisa || Camisa < 1 || Camisa > 99)
                        {
                            Conteudo+=`<div>
                            <div class="form-floating  mb-0">
                                <input id="Camisa" name="Camisa" type="number" value="${Camisa}" maxlength="11" class="form-control" placeholder="N° Camisa">
                                <label for="Camisa">N° Camisa</label>
                            </div>
                            <span class="text-danger">Informe a camisa do jogador!Entre 0 e 99</span></div>`;
                        }
                        else
                        {
                            Conteudo+=`
                            <div class="form-floating  mb-3">
                                <input id="Camisa" name="Camisa" value="${Camisa}" type="number" maxlength="11" class="form-control" placeholder="N° Camisa">
                                <label for="Camisa">N° Camisa</label>
                            </div>`;
                        }
                        
                        if(!Altura || Altura > 250)
                        {
                            Conteudo+=`<div>
                            <div class="form-floating  mb-0">
                                <input id="Altura" name="Altura" value="${Altura}" type="number" class="form-control" placeholder="Altura em Cm">
                                <label for="Altura">Altura em Cm</label>
                            </div>
                            <span class="text-danger">Informe a altura do jogador!Limite 250 Cm</span></div>`;
                        }
                        else
                        {
                            Conteudo+=`
                            <div class="form-floating  mb-3">
                                <input id="Altura" name="Altura" value="${Altura}" type="number" class="form-control" placeholder="Altura em Cm">
                                <label for="Altura">Altura em Cm</label>
                            </div>`;
                        }
                        if(!Posicao)
                        {
                            Conteudo+=`<div>
                            <div class="form-floating  mb-0">
                                <select class="form-select" id="Posicao" name="Posicao">
                                    <option selected value="">..</option>
                                    <option> Líbero </option>
                                    <option> Ponteiro </option>
                                    <option> Levantador </option>
                                    <option> Oposto </option>
                                    <option> Central </option>
                                </select>
                                <label for="Posicao">Posição</label>
                            </div>
                            <span class="text-danger">Informe a posição do jogador!</span></div>`;
                        }
                        else
                        {
                            Conteudo+=`
                            <div class="form-floating  mb-3">
                                <select class="form-select" id="Posicao" name="Posicao">
                                    <option value="">..</option>
                                    <option ${Posicao == "Líbero"? 'selected' : ''}> Líbero </option>
                                    <option ${Posicao == "Ponteiro"? 'selected' : ''}> Ponteiro </option>
                                    <option ${Posicao == "Levantador"? 'selected' : ''}> Levantador </option>
                                    <option ${Posicao == "Oposto"? 'selected' : ''}> Oposto </option>
                                    <option ${Posicao == "Central"? 'selected' : ''}> Central </option>
                                </select>
                                <label for="Posicao">Posição</label>
                            </div>`;
                        }
                        Conteudo+=`<div class="form-floating  mb-3">
                                <select class="form-select" id="OptionEquipe" name="OptionEquipe">
                                    <option value="">..</option>`;
                        if(ListaEquipes.length>0)
                        {
                            for( let i = 0 ; i < ListaEquipes.length ; i++ )
                                Conteudo+=`<option ${OptionEquipe==ListaEquipes[i].EquipeNome ? 'selected' : ''}> ${ListaEquipes[i].EquipeNome} </option>`;
                        }
                        Conteudo+=`</select>
                        <label for="OptionEquipe">Selecione a Equipe (Caso nenhuma apareça, cadastre uma nova)</label>`;
                        if(OptionEquipe === "")
                            Conteudo+=`<span class="text-danger">Selecione a equipe do jogador!</span>`;
                        if(LimiteEquipe)
                            Conteudo+=`<span class="text-danger">Equipe já possui 6 Jogadores!</span>`;
                        Conteudo+=`</div>
                    <div style="text-align: center;">
                        <button type="submit" class="btn btn-success btn-lg">Cadastrar</button>
                        <a class="btn btn-danger btn-lg" href="/">Cancelar</a>
                    </div>
                </form>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </html>`;
        Resposta.send(Conteudo);
        Resposta.end();
    }
});
app.get("/ListaEquipes",VerificarAutenticacao, (Requisicao, Resposta) => 
{
    const UltimoLogin = Requisicao.cookies.UltimoLogin;

    let Conteudo=`<html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
            <title>VôleiManager</title>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" style="padding: 10px 30px;">
                        <div class="container-fluid justify-content-start">
                            <a class="navbar-brand fw-bold" href="/">
                                🏐 VôleiManager
                            </a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse " id="navbarNavDropdown">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                                    <li class="nav-item">
                                        <a class="nav-link" href="/">Início</a>
                                    </li>

                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                            aria-expanded="false">
                                            Cadastro
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-dark">
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarEquipes">Cadastrar Equipes</a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="/CadastrarJogadores">Cadastrar Jogadores</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="nav-item">
                                        <a class="nav-link" href="/ListaEquipes">Lista de Equipes</a>
                                    </li>

                                    <div class="d-flex align-items-center">
                                    <span class="navbar-text me-3 text-white">
                                        ${UltimoLogin ? `Último Login: ${UltimoLogin}` : ''}
                                    </span>
                                    <a class="btn btn-outline-danger btn-sm" href="/Logout">Sair</a>
                                </div>
                                </ul>
                            </div>
                        </div>
                    </nav>
                <h1 style="margin: 30px;text-align: center;">Lista de Equipes</h1>
                <div class="container" style="align-items: center; justify-content: center; display: flex; flex-direction: column;">`;
            if(ListaEquipes.length > 0 )
            {
                for( let i = 0 ; i < ListaEquipes.length ; i++ )
                {
                    Conteudo+=`<table class="table table-striped table-hover table-bordered text-center">
                            <thead>
                                <tr>
                                <th colspan="2"> Técnico: ${ListaEquipes[i].TecnicoNome} </th>
                                    <th colspan="2"> Equipe: ${ListaEquipes[i].EquipeNome} </th>
                                    <th colspan="2"> Telefone: ${ListaEquipes[i].TecnicoTelefone} </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> Jogador </td>
                                    <td> Gênero </td>
                                    <td> Data de Nascimento </td>
                                    <td> N° Camisa </td>
                                    <td> Altura </td>
                                    <td> Posição </td>
                                </tr>`
                            if(ListaEquipes[i].Jogadores !== undefined)
                            for( let a = 0 ; a < ListaEquipes[i].Jogadores.length ; a++ )
                                Conteudo+=`<tr>
                                        <td> ${ListaEquipes[i].Jogadores[a].Nome} </td>
                                        <td> ${ListaEquipes[i].Jogadores[a].Sexo} </td>
                                        <td> ${ListaEquipes[i].Jogadores[a].Data} </td>
                                        <td> ${ListaEquipes[i].Jogadores[a].Camisa} </td>
                                        <td> ${ListaEquipes[i].Jogadores[a].Altura}Cm </td>
                                        <td> ${ListaEquipes[i].Jogadores[a].Posicao} </td>
                                    </tr>`;
                                Conteudo+=`
                            </tbody>
                        </table>`
                }
            }
            else
            {
                Conteudo+=`
                    <h1 style="text-align: center; margin: 30px;">Nenhuma equipe cadastrada!</h1>`;
            }
            Conteudo+=`
            <div style="text-align: center;">
                <a class="btn btn-success btn-lg" href="/CadastrarEquipes">Cadastrar Nova Equipe</a>
                <a class="btn btn-success btn-lg" href="/CadastrarJogadores">Cadastrar Novo Jogador</a>
                <a class="btn btn-danger btn-lg" href="/">Voltar ao Menu</a>
            </div>
            </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </html>`;

    Resposta.send(Conteudo);
    Resposta.end();
})
app.get("/Login", (Requisicao, Resposta) => 
{
    Resposta.send(`<!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </head>
    <body>
        <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div class="card shadow-sm p-4" style="width: 100%; max-width: 400px;">
                <h2 class="text-center mb-4">Login</h2>
                <form method="post" action="/Login" name="formulario" id="formulario" novalidate>
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuário</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" required>
                    </div>
                    <div class="mb-4">
                        <label for="senha" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="senha" name="senha" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Entrar</button>
                </form>
            </div>
        </div>
    </body>
    </html>`);
});
app.post("/Login", (Requisicao, Resposta) => 
{
    const usuario = Requisicao.body.usuario;
    const senha = Requisicao.body.senha;
    if(usuario == 'admin' && senha == '123')
    {
        Requisicao.session.logado = true;
        const DataHoraAtual = new Date();
        Resposta.cookie('UltimoLogin',DataHoraAtual.toLocaleString('pt-BR'),{ maxAge: 1000*60*60*24});
        Resposta.redirect("/");
    }
    else
    {
        Resposta.send(`
            <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </head>
        <body>
            <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div class="card shadow-sm p-4" style="width: 100%; max-width: 400px;">
                <h2 class="text-center mb-4">Login</h2>
                <form method="post" action="/Login" name="formulario" id="formulario" novalidate>
                    <div class="mb-3">
                        <label for="usuario" class="form-label">Usuário</label>
                        <input type="text" class="form-control" id="usuario" name="usuario" required>
                    </div>
                    <div class="mb-4">
                        <label for="senha" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="senha" name="senha" required>
                        <span style="color: red">Usuário ou senha inválidos!</span>  
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Entrar</button>
                </form>
            </div>
        </div>
        </body>
        </html>`);
    }
});
function VerificarAutenticacao(Requisicao, Resposta, next) 
{
    if (Requisicao.session.logado)
        next();
    else
        Resposta.redirect("/Login");
}
app.get("/Logout", (Requisicao, Resposta) => 
{
    Requisicao.session.destroy();
    Resposta.redirect("/Login");
});
app.listen(port, host, () => 
{
    console.log(`Servidor em execução em http://${host}:${port}/`);
});