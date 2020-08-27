import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: "#788eec",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    borderRadius: 5,
    backgroundColor: "salmon",
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    padding: 20,
    marginBottom: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    paddingVertical: 20,
    paddingRight: 100,
    paddingLeft: 70,
  },
  entityText: {
    fontSize: 20,
    color: "#333333",
    paddingRight: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
