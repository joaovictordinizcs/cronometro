import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutos: 0,
      segundos: 0,
      milissegundos: 0,
      idTimer: null,
      textoBotao: "INICIAR",
      lista: [],
      contadorVoltas: 0,
    };
  }

  iniciar = () => {
    if (this.state.idTimer) {
      clearInterval(this.state.idTimer);
      this.setState({ idTimer: null, textoBotao: "INICIAR" });
    } else {
      this.setState({ textoBotao: "PAUSAR" }, () => {
        const idTimer = setInterval(() => {
          this.setState((prevState) => {
            let { minutos, segundos, milissegundos } = prevState;
            milissegundos += 1;
            if (milissegundos === 10) {
              segundos += 1;
              milissegundos = 0;
            }
            if (segundos === 60) {
              minutos += 1;
              segundos = 0;
            }
            return { minutos, segundos, milissegundos };
          });
        }, 100);
        this.setState({ idTimer });
      });
    }
  };

  desliga = () => {
    if (this.state.idTimer) {
      this.setState((prevState) => {
        const lista = [...prevState.lista, `${this.state.minutos.toString().padStart(2, "0")}:${this.state.segundos.toString().padStart(2, "0")}.${this.state.milissegundos.toString().padStart(1, "0")}`];
        return { lista, contadorVoltas: prevState.contadorVoltas + 1 };
      });
    }
    clearInterval(this.state.idTimer);
    this.setState({
      minutos: 0,
      segundos: 0,
      milissegundos: 0,
      idTimer: null,
      textoBotao: "INICIAR",
    });
    console.log(this.state.lista);
  };

  render() {
    const { minutos, segundos, milissegundos, textoBotao, contadorVoltas } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>EMPRESA TEMPO CERTO</Text>
        </View>

        <Text style={styles.cronometro}>
          {`${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}.${milissegundos.toString().padStart(1, "0")}`}
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.iniciar}>
          <Text style={styles.buttonText}>{textoBotao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.desliga}>
          <Text style={styles.buttonText}>
            {this.state.idTimer ? "PAUSAR E SALVAR" : "DESLIGA"}
          </Text>
        </TouchableOpacity>
        {this.state.lista.length > 0 && (
          <View>
            <Text style={styles.saveTimers}>Voltas:</Text>
            {this.state.lista.map((item, index) => (
              <Text key={index} style={styles.saveTimers}>
                {`${index + 1}. ${item}`}
              </Text>
            ))}
          </View>
        )}
        <Text style={styles.contadorVoltas}>{`Número de Voltas: ${contadorVoltas}`}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 100,
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 34,
    fontWeight: "bold",
    alignContent:"center",
    alignItemn:"center",
    color:'red'
  },
  cronometro: {
    fontSize: 60,
    color: "black",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "lightblue",
    height: 66,
    width: 220,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  saveTimers: {
    fontSize: 32,
    color: "blue",
    borderBottomColor:'red'
  },
  contadorVoltas: {
    fontSize: 28,
    color: "black",
    marginTop: 30,
    
  },
});
