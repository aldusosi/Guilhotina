import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [palavra, setPalavra] = useState("");
  const [letra, setLetra] = useState("");
  const [letrasCertas, setLetrasCertas] = useState([]);
  const [erro, setErro] = useState("");
  const [message, setMessage] = useState("");
  const [caractersEspeciais, setCaractersEspeciais] = useState([]);

  //coleta todas as letras com caracters especiais de 'palavra'.
  useEffect(()=>{
    coletarCaractersEspeciais();
    console.log(caractersEspeciais)
  },[palavra]);

  //limpa as letras com acertos evitando que apareçam na tela
  useEffect(() => {
    setLetrasCertas([]);
  }, [palavra.length]);

  function handleTamanhoDaPalavra(e) {
    e.preventDefault();
    alert("função indisponivel no momento");
  }

  //confere a cituação da letra escolhida.
  function conferirLetra(e) {
    e.preventDefault();
    if (palavra) {
      let palavraCrua = palavra
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      if (palavraCrua.includes(letra)) {
        for (let item of palavraCrua) {
          if (item === letra || item === letra.toUpperCase()) {
            setErro("");
            setMessage("Acertou!");
            if (letrasCertas.includes(letra)) {
              setLetrasCertas(letrasCertas);
            } else {
              for(let i of caractersEspeciais){

                if(i.normalize === letra ){
                  if(palavra.includes(i.normalize))
                  setLetrasCertas([...letrasCertas, i.nome, letra]);
                  else
                  setLetrasCertas([...letrasCertas, i.nome]);
                }else{
                  setLetrasCertas([...letrasCertas, letra]);
                }
                //confere se o usuário acertou todas as letras.
                verificarSeCompletou()
              }
            }
          }
        }
      } else {
        setMessage("");
        setErro("Ops! A palavra não contém essa letra.");
      }
      setLetra("");
    } else {
      setErro("Você precisa de uma palavra para começar.");
    }
  }

  function coletarCaractersEspeciais(){
    //CRIA UM ARRAY DE OBJETOS DE CARACTERS ESPECIAIS
    for (let i of palavra) {
      if (i.normalize("NFD")[1]) {
        let index = palavra.indexOf(i);
        let objectEspecial = {
          nome: i,
          index: index,
          normalize: i.normalize("NFD")[0]
        };
        setCaractersEspeciais([...caractersEspeciais, objectEspecial]);
      }
    }
  }

  function verificarSeCompletou() {
    console.log("entrou");
    let LetrasNaoRepetidasDePalavra = "";
    for (let item of palavra) {
      if (!LetrasNaoRepetidasDePalavra.includes(item)) {
        LetrasNaoRepetidasDePalavra += item;
        console.log(letrasCertas.length);
      }
    }
    if (letrasCertas.length === LetrasNaoRepetidasDePalavra.length - 1) {
      setMessage("Parabéns! Você completou!");
      setPalavra("");
    }
  }

  return (
    <div className="App">
      <h1 className="title">Guilhotina</h1>
      <form>
        <div className="escolher_palavra">
          <input
            type="password"
            value={palavra}
            onChange={(e) => setPalavra(e.target.value)}
            placeHolder="palavra..."
          />
          <span>ou</span>
          <button type="button" onClick={handleTamanhoDaPalavra}>
            Randonize
          </button>
        </div>

        <div className="display">
          <div>
            <h3>
              {palavra
                .split("")
                .map((item) => (letrasCertas.includes(item) ? item : "-"))}
            </h3>
            <h4>{palavra.length === 0 ? "0" : palavra.length} letras</h4>
          </div>

          <p>Que palavra é essa?</p>
        </div>

        <div className="escolher_letra">
          <div>
            <p>Letra</p>
            <input
              type="text"
              maxLength="1"
              value={letra}
              onChange={(e) => setLetra(e.target.value)}
            />
          </div>
          <div>
            <button
              className="arriscar"
              type="submit"
              onClick={(e) => conferirLetra(e)}
            >
              Arriscar ?
            </button>
          </div>
          <div className="alerts">
            {erro && <div className="error">{erro}</div>}
            {message && <div className="message">{message}</div>}
          </div>
        </div>
      </form>
    </div>
  );
}
