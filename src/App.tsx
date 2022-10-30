import './App.css';
import image from './images/GERADOR_DE.png'
import pptxgen from "pptxgenjs";
import React, { useState } from 'react';

function App() {

  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [backGroundColor, setBackGroundColor] = useState('');
  const [fontSize, setFontSize] = useState(0);
  const [fontName, setFontName] = useState('');

  const handleMessageChange = event => {
    setMessage(event.target.value);
  };

  const handleColorChange = event => {
    setColor(event.target.value);
  };
  
  const handleBackGroundChange = event => {
    setBackGroundColor(event.target.value);
  };

  const handleFontSize = event => {
    setFontSize(event.target.value);
  };

  const handleFontName = event => {
    setFontName(event.target.value);
  };

  const generate = () => {
    let pptx = new pptxgen()


    const format = message.split('\n')

// escolher outros tamanhos 9:16 e 4:3 (muito provavel que tenha que configurar outras variaveis de x,y,w e h)

    format.forEach(element => {
      pptx.defineLayout({ name:'A3', width: 16, height: 9 });
      pptx.layout = 'A3'
      let slide = pptx.addSlide();

      slide.background = { color: backGroundColor }; // cor do fundo do slide
      
      // separar igual ao phyton, uma config para a caixa e outra para o texto, tenta criar a caixa e dps add o texto
      
     
  slide.addText(element,
    { x: 1.6, // esquerda para direite
      y: 4, // de cima pra baixo
      w: "80%",
    h: 1,
    fontSize: fontSize,
    align: "center",
    color: color,
    fontFace: fontName 
  });
    })

    pptx.writeFile()
}
  return (
    <div>
      <title>Teste</title>
        <div className="img-fluid">
            <img src={image} alt='imagem' />
      </div>
    <div className="area-texto">
        <textarea 
        onChange={handleMessageChange} 
        placeholder={`Quebre sua copy em linhas (Não deixe linhas brancas), cada linha vai ser um slide, simples assim :D !`} 
        rows={17} 
        cols={100}>
          {`${message}`}
        </textarea>
    </div>
    <div>
    <div className="area-buttons">
        <span className='span-text'>Cor do texto:</span>
        <input type="color" id="favcolor" name="favcolor" onChange={handleColorChange} value={color} />
        <span className='span-text'>Cor do slide:</span>
        <input type="color" id="favcolor" name="favcolor" onChange={handleBackGroundChange} value={backGroundColor} />
        <span className='span-text'>Tamanho da fonte:</span>
        <input  type="number" min="1" max="100" onChange={handleFontSize} value={fontSize} />
        <span className='span-text'>Fonte(Arial, Open Sans e etc):</span>
        <input  type="text" onChange={handleFontName} value={fontName} />

    </div>

    <div className='generation-button'>
      <button onClick={generate}>Gerar VSL</button> 
      </div>
    </div>
    <footer className="footter-content">Gerador de VSL @Copyright 2022</footer>
    </div>
  );
}

export default App;
