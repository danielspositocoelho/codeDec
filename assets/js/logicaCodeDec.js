//NÃO CONSEGUIRIA FAZER SEM O STACKOVERFLOW E O INGLÊS... MUITAS FUNÇÕES NOVAS E PARTICULARIDADES DO JS

function criptografar()
{
    var textoOriginal = txtArea_original.value;
    var textoCriptografado = txtArea_novaMsg; 
    var resultado = [];                                    //criamos uma cópia criptografada da mensagem, sem alterar a original

    if(validar(textoOriginal)) 
    {    
        for (let i=0; i < textoOriginal.length; i++)
        {  
            var pulaChar = false;
            for(let y=0; y < chaves.length; y++)
            {
                if(textoOriginal[i] == chaves[y])          //se o char estiver dentro da lista de chaves, adicionamos seu código na nova msg no lugar da letra original (Ex: 'ober' invés de 'o' quando encontramos 'o' na palavra)
                {                           
                    resultado.push(chavesCod[y]);
                    pulaChar = true;  
                    break;  
                }
            }
            if (pulaChar == false)                          // caso o char da repetição não esteja na lista de chaves adicionamos ele como está
            {
                resultado.push(textoOriginal[i]);
            }
        }                              
        resultado.push('\u200C');                              //caracter invisível que assina a mensagem criptografada. ideia retirada do  artigo - https://blog.bitsrc.io/how-to-hide-secrets-in-strings-modern-text-hiding-in-javascript-613a9faa5787
                                                             //método .join('separador') retorna uma string com os elementos da array separados pelo simbolo indicado no parâmetro
        textoCriptografado.textContent = resultado.join('');      // unimos os elementos da nova mensagem em uma string sem separação entre eles, preservando a formatação original
                                                            //só funcionou usando o .value no momento em que fui atribuir valor. por que? 
    }
}

function descriptografar()
{
    var textoCripto = txtArea_original.value;
    var textoDescripto = txtArea_novaMsg; 
    var resultado = [];                                    // faz cópia da mensagem sem alterar a original

    if(validar(textoCripto))
    {    
        var encoDec = false;                                // caso a mensagem não tenha sido criptografada por esse script avisaremos o usuário sobre a possibiliade de erros ao descriptografar
        var pulaCharS = 0;                                 // caso encontremos a chave na palavra devemos pular a análise de todos os chars que a compõem, os quais estarão na sequência da letra inicial
        var pulaChar = false;
        for (let i = 0; i < textoCripto.length; i+=(1+pulaCharS))
        {     
            pulaCharS = 0;    
            pulaChar = false;
            for(let y = 0; y < chaves.length; y++)
            {
                if(textoCripto[i] == chaves[y])             //verifica se o char atual é uma vogal, ou seja, se está na lista de chars criptografáveis
                {        
                    let isChave = [];                       // array auxiliar, montamos uma array com o mesmo length da chave usando a sequencia de chars depois do char inicial
                    for(let j = 0; j < chavesCod[y].length; j++)  
                    {
                        isChave.push(textoCripto[i+j]);
                    }
                    let isChaveCod = isChave.join('');      //transforma a array auxiliar já preenchida em uma string
                    if(isChaveCod == chavesCod[y])          //compara a array auxiliar com a chave de criptografia associada a primeira letra da array auxiliar
                    {
                        resultado.push(chaves[y]);          //se for igual, colocamos na nova mensagem somente a vogal inicial da chave
                        pulaChar = true;
                        pulaCharS = chavesCod[y].length-1;  // pulamos o restante dos chars da mensagem até o ponto em que acaba a sequencia que foi decriptografada
                    }
                }
            }
            if (textoCripto[i] === '\u200C')
                encoDec = true;

            if (pulaChar == false)
                resultado.push(textoCripto[i]);
        }                 
        if (encoDec==false)
            alert('\nAtenção, provavelmente esta mensagem não foi previamente criptografada usando EncoDec, portanto o resultado pode apresentar erros ou inconsistências.')
        textoDescripto.textContent = resultado.join(''); 
    }
}

function validar(texto)
{    
                                        /*checa se cada char do texto é igual a esse char Maisculo. Se for, a letra é maiusculo. Se não for, mas não houver diferença entre o char maiusculo e ele minusculo, então ele não é uma letra. Números serão permitidos*/
    let ok = true;
    for(let i=0; i < texto.length; i++)
    {
        let maiuscula = texto[i].toUpperCase();
        if(texto[i] ==='\u200C')        // o char secreto que assina a criptografia é validado de antemão
        {
            ok=true;
        }
        else if(isNaN(texto[i]) )
        {
            if(texto[i] === maiuscula)
            {
                ok=false;
                txtArea_original.classList.add('invalido')
                break;
            }
            else if( (texto[i].toLowerCase() == maiuscula) && texto[i]!='')
            {   
                ok = false;
                break;
            }
        }   
    }

    if(ok)
        return true;
    else
    {
        txtArea_original.classList.add('invalido');
        txtArea_novaMsg.textContent = 'Atenção, o texto não deve conter letras maiúsculas, letras com acentos ou caracteres especiais';
        return false;   
    }
}

function copiar ()
{
    var textoCopiado = txtArea_novaMsg;
    textoCopiado.focus();
    navigator.clipboard.writeText(textoCopiado.textContent);
}

var botaoCripto = document.querySelector('button#btnCripto');
var botaoDescripto = document.querySelector('button#btnDescripto');
var txtArea_original = document.querySelector('#txtOriginal');
var botaoCopiar = document.querySelector('button#btnCopyCripto');
var txtArea_novaMsg = document.querySelector('#txtCripto');
var chaves = ['e','i','a','o','u'];
var chavesCod = ['enter', 'imes', 'ai','ober','ufat'];

botaoCripto.addEventListener('click', criptografar);
botaoDescripto.addEventListener('click', descriptografar);
botaoCopiar.addEventListener('click', copiar);