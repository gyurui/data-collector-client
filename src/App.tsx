import React from 'react';
import logo from './logo.svg';
import './App.css';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory';

interface PlotData {
    x: number;
    y: number;
}

interface State {
    plotDatax: PlotData[];
}

export class App extends React.Component<{}, State>{
  state = {
      plotDatax: []
  }

  public componentDidMount() {
      this.getData();
  }

  private getData = () => {
      setTimeout(() => {
          fetch('http://localhost:8080/data')
              .then(response => response.json())
              .then(data => this.setState({
                  plotDatax: data.array
              }));
          this.getData();
      }, 1000)
  }

  public render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              X axis graph
            </p>
              <div className="row selection-area">
                  <VictoryChart
                      theme={VictoryTheme.material}
                  >
                      <VictoryLine
                          style={{
                              data: { stroke: "#c43a31" },
                              parent: { border: "1px solid #ccc"}
                          }}
                          data={this.state.plotDatax}
                      />
                  </VictoryChart>
              </div>

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

}

