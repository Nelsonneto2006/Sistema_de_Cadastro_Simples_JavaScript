Recentemente, desenvolvi um sistema de cadastro de pessoas utilizando Node.js, executado diretamente no terminal. O objetivo do projeto foi praticar conceitos fundamentais de programação em JavaScript, como funções, validação de dados, manipulação de strings, expressões regulares e organização lógica do código.

O programa utiliza o módulo readline, que permite a interação com o usuário através do terminal. Dessa forma, o sistema solicita informações como nome completo, idade, CPF, telefone, e-mail e endereço (rua, bairro e número). Cada dado digitado passa por um processo de validação para garantir que esteja no formato correto antes de ser armazenado.

Para isso, implementei diversas funções de validação, responsáveis por verificar e formatar as informações. Por exemplo, o sistema garante que nomes, ruas e bairros contenham apenas letras, valida o formato do e-mail, formata telefone e CPF, além de remover caracteres inválidos quando necessário. Também há uma verificação especial para idade: caso o usuário informe uma idade superior a 100 anos, o sistema solicita a data de nascimento para confirmar essa informação.

Após todas as validações serem concluídas com sucesso, os dados são organizados em um objeto JavaScript e armazenados em um array de pessoas, simulando um pequeno banco de dados em memória. Ao final do cadastro, o sistema exibe a mensagem de confirmação e mostra os dados cadastrados.

Esse projeto foi importante para reforçar conhecimentos de lógica de programação, estruturação de código, validação de entradas do usuário e manipulação de dados em JavaScript, habilidades essenciais para o desenvolvimento de sistemas mais complexos.
