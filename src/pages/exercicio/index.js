import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { useIsFocused } from "@react-navigation/native";

let contador = 0;
let year = new Date().getFullYear();
function daysInYear(year) {
    return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
}
let diasAno = daysInYear(year);
export function Exercicio() {
    const { getItem, saveItem, removeItem, deleteItem } = useStorage();
    const focused = useIsFocused();
    useEffect(() => {
        async function loadDays() {
            const days = await getItem("@exercicio");
            contador = days.length - 1;
            setCount(days[contador]);
        }
        loadDays();
    }, [focused]);

    const [count, setCount] = useState(contador);
    const [max, setMax] = useState(diasAno);

    function fezExercicio() {
        contador++;
        saveItem("@exercicio", contador);
        setCount(count + 1);
        alert("Parabéns, o de hoje tá pago!!");
    }

    function semExercicio() {
        alert(
            "Que pena, o de hoje não foi pago, mas amanhã sei que vai compensar, o importante é não desistir"
        );
    }
    function reiniciar() {
        setCount(count - 1);
        removeItem("@exercicio", contador);
    }
    function passarAno() {
        contador = 0;
        deleteItem("@exercicio");
        setCount(contador);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTexto}>
                <Text style={styles.title1}>Projeto Verão </Text>
                <Text style={styles.title2}>
                    Contador de exercícios da Vivi
                </Text>
            </View>
            <View style={styles.containerImage}>
                <Image
                    source={require("../../assets/exercicio.png")}
                    style={styles.image}
                />
            </View>
            <Text style={styles.textoGrande}>Fez exercícios hoje?</Text>
            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonNao]}
                    onPress={semExercicio}
                    onLongPress={reiniciar}
                >
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        NÃO
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={fezExercicio}
                    onLongPress={passarAno}
                >
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        SIM
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
        width: 80,
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
