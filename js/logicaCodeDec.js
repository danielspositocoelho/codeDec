function criptografar()
{ /*criamos uma cópia criptografada da mensagem, sem alterar a original utilizando método .replace*/

    txtArea_original.classList.remove('invalido');
    var textoOriginal = txtArea_original.value;
    var novoTexto = txtArea_novaMsg; 
    var textoCriptografado = textoOriginal.replace(/[e\é\ê\ë]/gi,'enter') //FALTA ENCONTRAR UM MODO DE INSERIR UM TIPO DE CÓDIGO PARA CADA LETRA
                                            .replace(/[i\í\î\ï]/gi,'imes') // EX: é --> énter
                                            .replace(/[a\á\ã\â\ä]/gi,'ai')
                                            .replace(/[o\ó\ô\õ\ö]/gi,'ober')
                                            .replace(/[u\ú\û\ü]/gi,'ufat');
    console.log(textoCriptografado);
    textoCriptografado += '\u200C'; 
    novoTexto.textContent = textoCriptografado;                                                     
                                                  /*caracter invisível que assina a mensagem criptografada. ideia retirada do  artigo - https://blog.bitsrc.io/how-to-hide-secrets-in-strings-modern-text-hiding-in-javascript-613a9faa5787 */
}

function descriptografar()
{
    txtArea_original.classList.remove('invalido');
    var textoCripto = txtArea_original.value;
    var txtDescriptografado = txtArea_novaMsg; 

    /*checa se o input contém o caracter invisível que assinala a criptografia por este algoritmo*/
    if (textoCripto.charAt(textoCripto.length - 1) !== '\u200c')
    {
        txtArea_original.classList.add('invalido');
        alert('Atenção, provavelmente esta mensagem não foi previamente criptografada usando EncoDec, portanto o resultado pode apresentar erros ou inconsistências.');
    }  
    var textoDescripto = textoCripto.replace(/(enter|énter|ênter|ënter)/gi,'e')
                                            .replace(/(imes|ímes|îmes|ïmes)/gi,'i')
                                            .replace(/(ai|ái|ãi|âi|äi)/gi,'a')
                                            .replace(/(ober|óber|ôber|õber|öber)/gi,'o')
                                            .replace(/(ufat|úfat|ûfat|üfat)/gi,'u');
    txtDescriptografado.textContent = textoDescripto;
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


botaoCripto.addEventListener('click', criptografar);
botaoDescripto.addEventListener('click', descriptografar);
botaoCopiar.addEventListener('click', copiar);