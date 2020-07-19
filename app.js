/* eslint-disable react/state-in-constructor */
/* eslint-disable max-classes-per-file */
const Header = (props) => {
  console.log(props);
  return (

    <header>
      <h1>{props.title}</h1>
      <span className="stats">
        Players:
        {props.totalPlayers}
      </span>
    </header>

  );
};

const Player = (props) => (
  <div className="player">
    <span className="player-name">
      <button className="remove-player" onClick={() => props.removePlayer(props.id)}>✖</button>
      {props.name}
    </span>

    <Counter />
  </div>

);

class Counter extends React.Component {
  state = {
    score: 0, // this is a shortcut (class property syntax) of constructor with super() and this.state = {score: 0}, check babel conversion (so its transpiled for all browsers) if you want to see how this is handled.
  };

  // class method
  incrementScore = () => { // need to bind(this) as the class method forgets is implicily invoked binding when called, though if we use an arrow function when calling increment score lexical binding is applied (so automaticcaly binds to scope) (so prev was onclick = this.incrementScore.bind(this)), we added this to the render bit, but following this a more common way is to make the class method an arrow function as done here, this then applys the binding throuhout
    this.setState((prevState) => ({
      score: prevState.score + 1,
    }));
  }

  decrementScore = () => { // works better asynchronously with a callback as opposed to score: this.state.score -1
    this.setState((prevState) => ({

      score: prevState.score - 1,
    // note wrapping function body in parenthesis omits the need for a return{} statement , the return is implied , see opposite above in incscore
    }));
  }

  render() {
    return (
      <div className="counter">
        <button className="counter-actiom decrement" onClick={this.decrementScore}> - </button>
        <span className="counter-score">{this.state.score}</span>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    players: [
      {
        name: 'Guil',
        id: 1,
      },
      {
        name: 'Treasure',
        id: 2,
      },
      {
        name: 'Ashley',
        id: 3,
      },
      {
        name: 'James',
        id: 4,
      },

    ],
  }

  handleRemovePlayer = (id) => {
    this.setState((prevState) => ({
      players: prevState.players.filter((p) => p.id !== id),
    }));
  }

  render() {
    return (
      <div className="scoreboard">
        <Header title="Scoreboard" totalPlayers={this.state.players.length} />

        {/* Players list */}
        {this.state.players.map((player) => (
          <Player
            name={player.name}
            id={player.id}
            score={player.score}
            key={player.id.toString()}
            removePlayer={this.handleRemovePlayer}
          />
        ))}

      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),

);
