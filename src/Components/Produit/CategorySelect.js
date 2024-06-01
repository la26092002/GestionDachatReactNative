import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Avatar, Button, Card, DataTable, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { database } from "../../Model/database";
import { useDataContext } from "../../Context/DataContext";

const LeftContent = (props) => <Avatar.Icon {...props} icon="shape" />;
export default function CategorySelect({}) {
  const [name, setName] = React.useState("");
  const { state, dispatch } = useDataContext();
  async function addCategorie() {
    if (name.length > 0) {
      try {
        let db = await database.openDatabase();
        let reslt = await database.insertCategorie(db, name);
        //data.push({ id_fournisseur: reslt+1, nom_fournisseur: name });
        dispatch({
          type: "addCategorie",
          payload: { id_category: reslt, nom_category: name },
        });
        //console.log(reslt)
        setName("");
      } catch (error) {
        console.error("Error inserting Category:", error);
      }
    }
  }

  useEffect(() => {
    async function load() {
      try {
        let db = await database.openDatabase();
        let categories = await database.getCategories(db);
        //setData(categories);
        dispatch({
          type: "getCategories",
          payload: categories,
        });
        // console.log(await database.getFournisseur(db))
      } catch (error) {
        console.error("Error inserting fournisseur:", error);
      }
    }
    load();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.Bodyiew}>
        <ScrollView style={styles.scrollView}>
          <Card style={styles.Card}>
            <Card.Title title="Ajouter une Categorie" left={LeftContent} />
            <TextInput
              label="Nom de Categorie"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Card.Actions>
              <Button onPress={addCategorie}>Ajouter</Button>
            </Card.Actions>
          </Card>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Categorie</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
           {
            state.category.map((category, index) => (
              <DataTable.Row key={category.id_category}>
              <DataTable.Cell>{category.nom_category}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  icon="eyedropper-variant"
                  mode="text"
                  onPress={() => alert("Pressed")}
                >
                  Modifier
                </Button>
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  icon="eyedropper-variant"
                  mode="text"
                  onPress={() => alert("Pressed")}
                >
                  Supprimer
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
            ))
           }
            
           
           
            
          </DataTable>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  
  Bodyiew: {
    height: hp(70),
    width: wp(100),
  },
  Card: {
    marginHorizontal: 10,
  },
});