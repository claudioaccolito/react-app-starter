# Creare un'applicazione web con React

 :muscle: 300 pt  
 :clock130: ~ 30 min

## Prepariamo l'ambiente di lavoro

Per procedere dobbiamo avere installato

* Il nostro IDE preferito (esempio [VS Code](https://code.visualstudio.com/))
* NodeJs (scaricabile [qui](https://nodejs.org/it/))

## React

React è una libreria JavaScript per creare *single page applications*, ovvero interfacce grafiche interattive senza bisogno di un refresh della pagina per visualizzare nuovi contenuti (come succedeva invece per i vecchi siti web).\
Si presta bene per creare una web app ma allo stesso tempo permette di avere una struttura del codice modulare dato che possiamo dividere ogni singolo elemento della pagina con dei componenti riutilizzabili.\
La documentazione ufficiale propone diversi tutorial per imparare i concetti chiave, a partire dal classico esempio dell'app "lista della spesa" fino all'implementazione del gioco del [tris](https://codepen.io/gaearon/pen/gWWZgR?editors=0010).

Per maggiori dettagli si rimanda alla [documentazione ufficiale](http://reactjs.org/).

## Configurazioni

Ci sono diversi modi per aggiungere la libreria React ad un progetto.
Dal più banale come aggiungere gli script nel *body* della pagina HTML, oppure eseguendo comandi ad hoc.\
Tutte le modalità sono disponibili [qui](https://en.reactjs.org/docs/create-a-new-react-app.html).

Una delle modalità più rapide per cominciare è utilizzare *npm*, digitando da terminale.

``` shell
npm install --save react react-dom create-react-class webpack
```

Abbiamo ora tutti i pacchetti per poter creare la nostra web app, quindi usiamo *npx*, un esecutore di pacchetti incluso in *npm*.

``` shell
npx create-react-app react-app-starter
cd react-app-starter
npm start
```

:heart_eyes: La nostra web app è già pronta su [localhost:3000](http://localhost:3000/)

### Conventions over configurations

**Cosa ha fatto npx :question:**\
Lo script *npx* appena eseguito ha scaricato tutti i pacchetti necessari per configurare un progetto React.

**npm start :question:**\
npm start è uno degli script configurati all'interno del *package.json*

``` json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
  ```

In *react-scripts* sono inclusi gli strumenti come Babel e Webpack già preconfigurati.\
Il primo permette di scrivere una sintassi javscript che ci consente facilmente di mixare javascript e Html, il secondo invece di lanciare la web app in locale (con il comando *npm start*) ma anche di produrre file statici al fine di avere già degli assets ottimizzati (con il comando *npm run build*) da caricare su un web server.\
Insomma quindi non dobbiamo preoccuparci delle configurazioni e possiamo concentrarci sull'implementazione!

## Il metodo *render*

Ok è partita la nostra web app e siamo rimasti ipnotizzati dall'icona roteante di React, adesso proviamo a sviluppare velocemente una tanto piccola quanto stupida applicazione.

Il file *src/App.js* si presenta in questo modo

``` javascript
 import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
  ```

  Modifichiamo la *Funzione* **App** in una *Classe* in modo da esplicitare alcune caratteristiche di React quali il concetto di *render*.

  ``` javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    render() {
      return (
      <div className="App">
        <header className="App-header">
          <p>Stupid simple app</p>
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => console.log("clicked")}>
            CLICK ME PLEASE
          </button>
        </header>
      </div>
      );
    }
}

export default App;
```

Notiamo che grazie alle configurazioni esistenti ogni volta che salviamo il sorgente la web app si aggiorna automaticamente nel browser.

In questo momento abbiamo inserito un `<button>` che non fa altro che stampare un log nella console del browser. Ma la cosa importante è capire che cosa fa la funzione `render()`.
Essa viene eseguita per ritornare il risultato del componente che nel nostro caso è un oggetto html ma può essere anche semplicemente un numero o una stringa o un altro componente React.

Tipicamente la funzione di *render* viene eseguita ogni volta che "qualcosa cambia".
Per "qualcosa" in particolare si intede due oggetti del componente React: `props` e `state`.\
Possiamo dire che un componente React, se non è una pura funzione come in origine prima delle nostre modifiche, reagisce in base alle modifiche di questi due oggetti che ora andiamo a descrivere meglio.

## Lo *state* di un componente

Introduciamo il concetto di `state` con un esempio per capire di cosa parliamo.

Facciamo un esempio semplice di app in cui il logo gira in senso orario o antiorario a seconda del click del bottone.

Aggiungiamo quindi la classe css *App-logo-reverse* per invertire il senso di rotazione con la sua animazione *App-logo-spin-isReverse* nel file `src/App.css`

``` css
.App-logo, .App-logo-reverse {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
  .App-logo-reverse {
    animation: App-logo-spin-isReverse infinite 20s linear;
  } 
}

@keyframes App-logo-spin-isReverse {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
```

Adesso modifichiamo il file *App.js* aggiungendo un costruttore che inizializza lo state con l'oggetto `isReverse` valorizzato a `false`.\
Facciamo la funzione `reverseRotate` agganciandola al click del bottone così da alternare lo stato *isReverse* ogni volta che il bottone viene cliccato.\
Per concludere, all'interno del *render*, inseriamo la regola per cui si alterni la classe CSS `App-logo-reverse` con `App-logo` in base al valore di *isReverse*.

``` javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReverse: false };
  }

  reverseRotate = () => {
    this.setState(prevState => ({ isReverse: !prevState.isReverse }))
  }

  render() {
    const { isReverse } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Stupid simple app</h1>
          <p>{isReverse ? "counterclockwise" : "clockwise"} direction</p>
          <img src={logo} className={isReverse ? "App-logo-reverse" : "App-logo"} alt="logo" />
          <button onClick={this.reverseRotate}>REVERSE!</button>
        </header>
      </div>
    );
  }
}
```

Come si può notare ogni volta che viene cliccato il bottone lo *state* cambia e viene perciò richiamata la funzione di *render*. In questo modo si aggiorna la classe CSS e otteniamo come risultato visivo che viene invertito il senso di rotazione del logo.

Ecco il risultato finale.

![Risultato Hello World](./images/react-app.gif)

## Le *props* di un componente

Concludiamo facendo un esempio di refactoring al fine di esplicitare l'utilizzo di *props* di un componente React.\
Quindi creaiamo uno *stateless component* al di sopra della classe come il seguente.

``` javascript
const SimpleLogo = ({ isReverse }) => (
    <div>
      <p>{isReverse ? "counterclockwise" : "clockwise"} direction</p>
      <img src={logo} className={isReverse ? "App-logo-reverse" : "App-logo"} alt="logo" />
    </div>
  );
};
```

In questo modo possiamo utilizzarlo come componente `SimpleLogo` all'interno del render della classe App semplicemente passandogli l'oggetto `isReverse`.

``` javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReverse: false };
  }

  reverseRotate = () => {
    this.setState(prevState => ({ isReverse: !prevState.isReverse }))
  }

  render() {
    const { isReverse } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Stupid simple app</h1>
          <SimpleLogo isReverse={isReverse} />
          <button onClick={this.reverseRotate}>REVERSE!</button>
        </header>
      </div>
    );
  }
}
```


Le `props` sono quindi dei dati che possiamo passare ai componenti "figli" e così facendo possiamo sviluppare più componenti riutilizzabili all'interno dell'applicazione, favorendo così il principio di modularità del codice.\
Uno dei vantaggi di React infatti è sicuramente la possibilità di creare diversi componenti da poter riusare, permettendoci di scrivere meno codice.

## Metodi di Lifecycle

React gestisce le risorse al *mounting* dei componenti. Per *mounting* intendiamo l'aggiungere il contenuto da renderizzare all'interno del [DOM](https://en.wikipedia.org/wiki/Document_Object_Model).\
Il controllo del momento in cui viene renderizzato ciascun componente è gestibile tramite metodi accessibili all'interno della classe React, per esempio abbiamo i metodi

* *componentWillMount* per eseguire operazioni nell'attimo che precede il *render*.
* *componentDidMount* per gestire l'attimo appena successivo al render.
* *componentWillReceiveProps* per confrontare le differenze con le precedenti *props* e permettere all'interfaccia di reagire ai cambiamenti.
* *shouldCompontentUpdate* per ottimizzare le performance. Utilizzando questo metodo evitiamo il comportamento di default per cui l’output di un componente è influenzato dalla modifica dello state o delle props, bensì stabiliamo la gestione della renderizzazione in base al valore ritornato da *shouldCompontentUpdate* che può essere *true* o *false*.

L'insieme completo dei metodi è disponibile in maniera molto più esaustiva nell'apposita sezione [State And Lifecycle](https://en.reactjs.org/docs/state-and-lifecycle.html).\
Tali metodi sono spesso utilizzati per gestire l'attesa dei dati che arrivano dalle API. Ad esempio la [documentazione](https://reactjs.org/docs/faq-ajax.html#where-in-the-component-lifecycle-should-i-make-an-ajax-call) di React consiglia di eseguire i servizi di richiesta API all'interno del metodo *componentDidMount*.

## Conclusioni

La popolarità di React permette di trovare infiniti tutorial ed esempi online, quello che conta alla fine è cimentarsi su un progetto reale poiché la maggior parte delle nozioni di questa libreria si apprendono con l'esperienza pratica.
