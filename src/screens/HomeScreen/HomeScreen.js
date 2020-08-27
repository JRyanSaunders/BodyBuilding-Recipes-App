import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState("");
  const [entities, setEntities] = useState([]);

  const entityRef = firebase.firestore().collection("entities");
  const userID = props.extraData.id;

  useEffect(() => {
    entityRef
      .where("authorID", "==", userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          // Query snapshot is an array of objects when I call .onSnapshot. Huge object containing 99% stuff I wont use
          const newEntities = []; // Create a new array to store the data im trying to get
          querySnapshot.forEach((doc) => {
            //loops through the array, doc is what returns each time it loops
            const entity = doc.data(); // .data() is the ACTUAL data im requesting i.e to a user object
            entity.id = doc.id; // doc id provides the uid for that particular document
            newEntities.push(entity); // pushes entity object to entities array.
          });
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const renderEntity = ({ item, index }) => {
    // Dont pass the values into it, it sends it as an object. Seperates properties for use. Data comes from renderItem in flatlist
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
        <Button
          title="delete"
          color="red"
          onPress={() =>
            entityRef
              .doc(item.id)
              .delete()
              .catch((error) => {
                alert(error);
              })
          }
          style={styles.deleteButton}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Shopping List:</Text>
      <Text>Make a note of the items you need at the store!</Text>
      <Button
        title="Sign Out"
        color="red"
        onPress={() => firebase.auth().signOut()}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new entity"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
}
