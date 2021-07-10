import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [palavra, setPalavra] = useState("");
  const [letra, setLetra] = useState("");
  const [letrasCertas, setLetrasCertas] = useState([]);
  const [erro, setErro] = useState("");
  const [message, setMessage] = useState("");
  //limpa as letras certas evitando que apareçam na tela
  useEffect(() => {
    setLetrasCertas([]);
  }, [palavra.length]);

  function handleTamanhoDaPalavra(e) {
    e.preventDefault();
    alert("função indisponivel no momento");
  }

  function conferirLetra(e) {
    e.preventDefault();
    if (palavra) {
      if (palavra.includes(letra)) {
        for (let item of palavra) {
          if (item === letra || item === letra.toUpperCase()) {
            setErro("");
            setMessage("Acertou!");
            if (letrasCertas.includes(letra)) {
              setLetrasCertas(letrasCertas);
              console.log(letrasCertas);
            } else {
              setLetrasCertas([...letrasCertas, letra]);
              verificarSeCompletou();
            }
          }
        }
      } else {
        setMessage("");
        setErro("Ops! A palavra não contém esta letra.");
      }
      setLetra("");
    } else {
      setErro("Você precisa de uma palavra para começar.");
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
