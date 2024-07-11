import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ListarAtletasGeneroFeminino, ListarAtletasMediaIdade, ListarMediasPorcentagens, atletasPorModalidade } from '../../services/HomeService';

const Home = () => {
  const [dataPie, setDataPie] = useState([]);
  const [dataIdade, setDataIdade] = useState([]);
  const [totalAtletas, setTotalAtletas] = useState([]);
  const [porcentagemMulheres, setPorcentagemMulheres] = useState([]);
  const [porcentagemHomens, setPorcentagemHomens] = useState([]);
  const [idadeMedia, setIdadeMedia] = useState([]);
  const [idadeMediaFeminino, setIdadeMediaFeminino] = useState([]);

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    atletasPorModalidade().then(response => {
      const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733'];
      const mappedData = response.map(item => ({
        key: item.nomeModalidade,
        value: item.quantidadeAtletas,
        svg: { fill: COLORS[Math.floor(Math.random() * COLORS.length)] }
      }));
      setDataPie(mappedData);
    }).catch(error => console.error('Erro ao buscar atletas por modalidade:', error));
  }, []);

  useEffect(() => {
    ListarAtletasMediaIdade().then(response => {
      const mappedData = response.map(item => ({
        key: item.modalidade,
        value: item.mediaIdade
      }));
      setDataIdade(mappedData);
    }).catch(error => console.error('Erro ao buscar idade média dos atletas:', error));
  }, []);

  useEffect(() => {
    ListarMediasPorcentagens().then(response => {
      setTotalAtletas(response.totalAtletas);
      setIdadeMedia(response.mediaIdade);
      setPorcentagemMulheres(response.porcentagemMulheres);
      setPorcentagemHomens(response.porcentagemHomens);
    }).catch(error => console.error('Erro ao buscar médias e porcentagens:', error));
  }, []);

  useEffect(() => {
    ListarAtletasGeneroFeminino().then(response => {
      const groupedData = response.reduce((acc, curr) => {
        curr.categoria.forEach(cat => {
          const [categoria, idade] = cat.split(', ');
          if (!acc[curr.modalidade]) {
            acc[curr.modalidade] = {};
          }
          if (!acc[curr.modalidade][categoria]) {
            acc[curr.modalidade][categoria] = [];
          }
          acc[curr.modalidade][categoria].push(Number(idade));
        });
        return acc;
      }, {});

      const finalData = [];
      for (const modalidade in groupedData) {
        for (const categoria in groupedData[modalidade]) {
          const ages = groupedData[modalidade][categoria];
          const avgAge = ages.reduce((a, b) => a + b, 0) / ages.length;
          finalData.push({ modalidade, categoria, mediaIdade: avgAge });
        }
      }
      setIdadeMediaFeminino(finalData);
    }).catch(error => console.error('Erro ao calcular idade média de atletas femininas:', error));
  }, []);

  const idadeMediaChartData = {
    labels: dataIdade.map(item => item.key),
    datasets: [
      {
        data: dataIdade.map(item => item.value),
      },
    ],
  };

  const idadeMediaFemininoChartData = {
    labels: idadeMediaFeminino.map(item => `${item.modalidade} (${item.categoria})`),
    datasets: [
      {
        data: idadeMediaFeminino.map(item => item.mediaIdade),
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dashboard}>
        <View style={styles.resumosDiv}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Médias</Text>
            <View style={styles.numerosGrandes}>
              <Text style={styles.numero}>{totalAtletas}</Text>
              <Text>Total de Atletas</Text>
            </View>
            <View style={styles.numerosGrandes}>
              <Text style={styles.numero}>{idadeMedia}</Text>
              <Text>Idade Média</Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Porcentagens</Text>
            <View style={styles.numerosGrandes}>
              <Text style={styles.numero}>{porcentagemHomens}%</Text>
              <Text>Atletas Homens</Text>
            </View>
            <View style={styles.numerosGrandes}>
              <Text style={styles.numero}>{porcentagemMulheres}%</Text>
              <Text>Atletas Mulheres</Text>
            </View>
          </View>
        </View>
        <View style={styles.graficosDiv}>
          <View style={styles.cardDashboard}>
            <Text style={styles.cardTitle}>Idade Média por Modalidade</Text>
            <BarChart
              style={styles.chart}
              data={idadeMediaChartData}
              width={screenWidth - 60}
              height={320}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: '#00695c',
                backgroundGradientFrom: '#004d40',
                backgroundGradientTo: '#00796b',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#009688'
                }
              }}
              verticalLabelRotation={30}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 50,
  },
  dashboard: {
    padding: 5,
  },
  resumosDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '46%',
    marginBottom: 20,
  },
  cardDashboard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    width: '120%',
    marginBottom: 10,
  },
  // carddashboard: {
  //   backgroundColor: '#fff',
  //   padding: 15,
  //   borderRadius: 10,
  //   width: '99%',
  //   marginBottom: 20,
  // },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
  },
  numerosGrandes: {
    alignItems: 'center',
  },
  numero: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  graficosDiv: {
    marginTop: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
});

export default Home;
