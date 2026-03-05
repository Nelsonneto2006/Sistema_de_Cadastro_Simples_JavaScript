const readline = require("readline"); 
// Módulo que permite ler dados digitados pelo usuário no terminal

// Cria a interface de entrada e saída do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Armazena todas as pessoas cadastradas
let pessoas = [];

function validarEmail(email){
    email = email.trim().toLowerCase();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexEmail.test(email)){
        return null;
    }
    return email;
}

function validarTelefone(telefone){
    telefone = telefone.replace(/\D/g, "");

    if(telefone.length !== 11){
        return null;
    }
     return telefone.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3"
    );
}

function validarBairro(bairro){
    bairro = bairro.trim();

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(bairro)){
        return null;
    }

    bairro = bairro 
        .toLowerCase()
        .split(" ")
        .filter(p => p.length > 0)
        .map(p => p[0].toUpperCase() + p.slice(1))
        .join(" ");
    
    return bairro;
}

function validarRua(rua){
    rua = rua.trim();

    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(rua)){
        return null;
    }

    rua = rua
        .toLowerCase()
        .split(" ") 
        .filter(p => p.length > 0) 
        .map(p => p[0].toUpperCase() + p.slice(1)) 
        .join(" "); 

    return rua;
}

function validarNome(nome){
    nome = nome.trim(); // trim remove espaços extras no início e no fim

     if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)){ // veridica se há apenas letras e espaços, o acento chapéu no começo serve para informar que a análise começa a partir do índice 0
        return null;
     }

     nome = nome
        .toLowerCase() // coloca toda a string em minúsculo
        .split(" ") // divide toda a string em um array utilizando o 'espaço' como divisor
        .filter(p => p.length > 0) // remove tdoas as strings vazias do array (isso evita espaço duplo, espaço no começo e no fim)
        .map(p => p[0].toUpperCase() + p.slice(1)) // Percorre cada palavra e pega a primeira letra e transforma em maiúscula
        .join(" "); // junta tudo em uma única string

    return nome;
}

// Valida a idade digitada
function validarIdade(idade) {
    // Remove tudo que não for número
    idade = idade.replace(/\D/g, "");

    // Se não sobrou nada, idade inválida
    if (idade.length === 0) { // vai validar se sobrou algum numero apos a correçao do \D ( apenas numeros ), se nao sobrar nada, dará erro
        return null;
    }

    idade = Number(idade); // converte idade para o tipo number

    // Idade negativa não faz sentido
    if (idade <= 0) {
        return null;
    }

    // Se idade for maior que 100, pede data de nascimento
    if (idade > 100) {
        return "DATA_NASCIMENTO";
    }

    return idade;
}

// Valida o número do endereço (somente números)
function validarNumEndereco(numero) {
    // Remove letras e caracteres especiais
    numero = numero.replace(/\D/g, "");

    // Se ficar vazio, é inválido
    if (numero.length === 0) {
        return null;
    }

    // Converte para número
    return Number(numero);
}

// Valida e formata CPF
function validarCPF(cpf) {
    // Remove tudo que não for número
    cpf = cpf.replace(/\D/g, "");

    // CPF deve ter exatamente 11 dígitos
    if (cpf.length !== 11) {
        return null;
    }

    // Formata no padrão brasileiro
    return cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
    );
}

// Valida a data de nascimento no formato DD/MM/AAAA
function validarDataNascimento(data) {
    // Verifica o formato da data
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
        return null;
    }

    // Divide a data em partes
    const [dia, mes, ano] = data.split("/").map(Number);

    // Cria objeto Date
    const nascimento = new Date(ano, mes - 1, dia);

    // Confere se a data é válida (ex: evita 31/02)
    if (
        nascimento.getFullYear() !== ano ||
        nascimento.getMonth() !== mes - 1 ||
        nascimento.getDate() !== dia
    ) {
        return null;
    }

    return nascimento;
}

// Calcula idade com base na data de nascimento
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    // Ajusta caso ainda não tenha feito aniversário no ano
    if (
        hoje.getMonth() < dataNascimento.getMonth() ||
        (
            hoje.getMonth() === dataNascimento.getMonth() &&
            hoje.getDate() < dataNascimento.getDate()
        )
    ) {
        idade--;
    }

    return idade;
}

// Cadastra a pessoa no array
function cadastrarPessoa(nome, idade, cpf, telefone, email, rua, bairro, numero) {
    pessoas.push({
        nome,
        idade,
        cpf,
        telefone,
        email,
        endereco: {
            rua,
            bairro,
            numero
        }
    });
}

// Início do programa
rl.question("Nome e sobrenome: ", (nomeInput) => {
    const nome = validarNome(nomeInput);

    if(!nome){ // se tiver algo fora das exigencias da funçao validarNome, dará erro
        console.log("ERRO! Nome inválido, utilize apenas letras!");
        rl.close();
        return;
    }

    rl.question("Idade: ", (idadeInput) => {

        const idade = validarIdade(idadeInput);

        // Idade inválida
        if (idade === null) {
            console.log("\n Idade inválida!");
            rl.close();
            return;
        }

        // Idade maior que 100 → pede data de nascimento
        if (idade === "DATA_NASCIMENTO") {
            pedirDataNascimento(nome);
            return;
        }

        // Idade normal
        continuarCadastro(nome, idade);
    });
});

// Solicita data de nascimento quando necessário
function pedirDataNascimento(nome) {
    rl.question("Informe a data de nascimento (DD/MM/AAAA): ", (dataInput) => {

        const dataNascimento = validarDataNascimento(dataInput);

        if (!dataNascimento) {
            console.log("\n Data de nascimento inválida!");
            rl.close();
            return;
        }

        const idadeCalculada = calcularIdade(dataNascimento);

        // Confirma se a data realmente indica mais de 100 anos
        if (idadeCalculada <= 100) {
            console.log("\n A data informada não confirma idade acima de 100 anos.");
            rl.close();
            return;
        }

        continuarCadastro(nome, idadeCalculada);
    });
}

// Continua o cadastro sem duplicar código
function continuarCadastro(nome, idade) {

    rl.question("CPF: ", (cpfInput) => {

        const cpf = validarCPF(cpfInput);

        if (!cpf) {
            console.log("\n CPF inválido!");
            rl.close();
            return;
        }

        rl.question("Telefone: ", (telefoneInput) => {

        const telefone = validarTelefone(telefoneInput);

        if(!telefone){
            console.log("ERRO! Número de telefone inválido. Por favor, digite novamente.")
            rl.close();
            return;
        }
            rl.question("Email: ", (emailInput) => {

                const email = validarEmail(emailInput);

                if(!email){
                    console.log("ERRO! Email inválido.");
                    rl.close();
                    return;
                }

                rl.question("Rua: ", (ruaInput) => {
                    
                    const rua = validarRua(ruaInput);
                    if(!rua){
                        console.log("ERRO! Rua Inválida, digite apenas letras!");
                        rl.close();
                        return;
                    }

                    rl.question("Bairro: ", (bairroInput) => {

                        const bairro = validarBairro(bairroInput);

                        if(!bairro){
                            console.log("ERRO! Nome de bairro inválido, digite apenas letras!");
                            rl.close();
                            return;
                        }

                        rl.question("Número: ", (numeroInput) => {

                            const numero = validarNumEndereco(numeroInput);

                            if (!numero) {
                                console.log("\n Número de endereço inválido!");
                                rl.close();
                                return;
                            }

                            // Cadastro final
                            cadastrarPessoa(nome, idade, cpf, telefone, email, rua, bairro, numero);

                            console.log("\n Pessoa cadastrada com sucesso!");
                            console.log(pessoas);

                            rl.close();
                        });
                    });
                });
            });
        });
    });
}
