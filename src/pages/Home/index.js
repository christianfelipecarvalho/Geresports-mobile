
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { PieChart } from 'react-native-svg-charts';
import { ListarAtletasGeneroFeminino, ListarAtletasMediaIdade, ListarMediasPorcentagens, atletasPorModalidade } from '../../services/HomeService';

const Home = () => {
  const [dataPie, setDataPie] = useState([]);
  const [dataIdade, setDataIdade] = useState([]);
  const [totalAtletas, setTotalAtletas] = useState([]);
  const [porcentagemMulheres, setPorcentagemMulheres] = useState([]);
  const [porcentagemHomens, setPorcentagemHomens] = useState([]);
  const [idadeMedia, setIdadeMedia] = useState([]);
  const [dataMulheres, setDataMulheres] = useState([]);

  useEffect(() => {
    atletasPorModalidade().then(response => {
      const mappedData = response.map(item => ({
        key: item.nomeModalidade,
        value: item.quantidadeAtletas,
        svg: { fill: COLORS[Math.floor(Math.random() * COLORS.length)] }
      }));
      setDataPie(mappedData);
    }).catch(error => console.error('Erro ao buscar atletas por modalidade:', error));
  }, []);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733'];

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
      const todasCategorias = new Set();
      const transformedData = response.map(item => {
        const transformedItem = { key: item.modalidade };

        item.categoria.forEach(cat => {
          const [categoria, valor] = cat.split(', ');
          transformedItem[categoria] = Number(valor);
          todasCategorias.add(categoria);
        });

        return transformedItem;
      });

      transformedData.forEach(item => {
        todasCategorias.forEach(cat => {
          if (!(cat in item)) {
            item[cat] = 0;
          }
        });
      });

      setDataMulheres(transformedData);
    }).catch(error => console.error('Erro ao buscar atletas femininas:', error));
  }, []);

  return (
    <View style={styles.container}>
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
          {/* <View style={styles.card}>
            <Text style={styles.cardTitle}>Atletas por Modalidade</Text>
            {/* <PieChart style={{ height: 200 }} data={dataPie} /> }
          </View> */}
        </View>
        <View style={styles.graficosDiv}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Atletas do Sexo Feminino por Categoria e Modalidade</Text>
            {/* gráfico de barras aqui */}
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Idade Média por Modalidade</Text>
            {/* gráfico de barras aqui */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 50
  },
  dashboard: {
    padding: 10,
  },
  resumosDiv: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
});

export default Home;
