import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { useIsFocused } from "@react-navigation/native";

let contador = 0;
let year = new Date().getFullYear();
function daysInYear(year) {
    return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
}
let countDias = daysInYear(year);
export function Hot() {
    const { getItem, saveItem, removeItem, deleteItem } = useStorage();
    const focused = useIsFocused();
    useEffect(() => {
        async function loadDays() {
            const days = await getItem("@hot");
            let contador = days.length - 1;

            setCount(days[contador]);
        }
        loadDays();
    }, [focused]);

    const [count, setCount] = useState(contador);
    const [ano, setAno] = useState(year);
    const [max, setMax] = useState(countDias);

    function teveSexo() {
        contador++;
        saveItem("@hot", contador);
        setCount(count + 1);
        alert("Nossa hoje foi um dia de sorte");
    }

    function passarAno() {
        contador = 0;
        setCount(contador);
        deleteItem("@hot");
    }

    function diminuir() {
        setCount(count - 1);
        removeItem("@hot", contador);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTexto}>
                <Text style={styles.title1}>Encontros {ano}</Text>
                <Text style={styles.title2}>Contador de dates</Text>
            </View>
            <View style={styles.containerImage}>
                <Image
                    source={require("../../assets/love.jpg")}
                    style={styles.image}
                />
            </View>
            <Text style={styles.textoGrande}>Clique quantas vezes fizeram</Text>
            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonNao]}
                    onPress={passarAno}
                >
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        REINICIAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={teveSexo}
                    onLongPress={diminuir}
                >
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        CONTAR
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.contador}>
                {count}/{max}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#5F9EA0",
        backgroundColor: "#B0C4DE",
        alignItems: "center",
        justifyContent: "center",
    },
    containerTexto: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 15,
        paddingTop: 40,
    },
    title1: {
        fontSize: 25,
        fontWeight: "bold",
    },
    title2: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 20,
    },
    containerImage: {
        alignItems: "center",
        marginBottom: 50,
        marginTop: 50,
    },
    image: {
        borderRadius: 50,
        width: 225,
        height: 225,
    },
    textoGrande: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 40,
    },
    containerButton: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: "aquamarine",
        padding: 10,
        borderRadius: 5,
        margin: 10,
        width: 110,
    },
    buttonNao: {
        backgroundColor: "#ff5555",
    },
    contador: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#ffff00",
        paddingTop: 50,
    },
});
