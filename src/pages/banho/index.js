import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect } from "react";
import useStorage from "../../hooks/useStorage";
import { useIsFocused } from "@react-navigation/native";

let contador = 0;
let contadorSemBanho = 0;
let contadorDias = 0;
let diasAno = 366;
let anoBiss = 0;
let year = new Date().getFullYear();
function daysInYear(year) {
    return (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;
}

diasAno = daysInYear(year);
export function Banho() {
    const { getItem, saveItem, removeItem, deleteItem } = useStorage();
    const focused = useIsFocused();
    useEffect(() => {
        async function loadDays() {
            const days = await getItem("@banhos");
            contador = days.length - 1;
            setCount(contador);
        }

        async function loadDaysAhead() {
            const daysAhead = await getItem("@banhoDays");
            contadorDias = daysAhead.length - 1;
            setCountDias(contadorDias);
        }

        async function loadSemBanho() {
            const diasSemBanho = await getItem("@banhoSemBanho");
            contadorSemBanho = diasSemBanho.length - 1;
            setNaoTomado(contadorSemBanho);
        }

        loadDays();
        loadDaysAhead();
        loadSemBanho();
    }, [focused]);

    const [count, setCount] = useState(contador);
    const [naoTomado, setNaoTomado] = useState(contadorSemBanho);
    const [countDias, setCountDias] = useState(contadorDias);
    const [max, setMax] = useState(diasAno);
    const [countAno, setCountAno] = useState(anoBiss);

    async function banhoTomado() {
        let faltam = max - 1 - countDias;

        if (countDias < max - 1) {
            contador++;
            contadorDias++;
            saveItem("@banhos", contador);
            saveItem("@banhoDays", contadorDias);
            setCount(count + 1);
            setCountDias(countDias + 1);
        } else {
            contador++;
            contadorDias++;
            saveItem("@banhos", contador);
            setCount(count + 1);
            setCountDias(countDias + 1);

            if (naoTomado === 0) {
                alert(
                    `Parabéns meu amor, completou o desafio! Estou muito orgulhoso!! IHIIHIIHI ❤️❤️❤️ \nQue incrível, você conseguiu tomar banho todos os dias mesmo, parabéns!`
                );
            } else if (naoTomado === 1) {
                alert(
                    `Parabéns meu amor, o ano acabou! Estou muito orgulhoso!! IHIIHIIHI ❤️❤️❤️ \nQuaseee, foi por pouco em, você não tomou banho 1 dia`
                );
            } else {
                alert(
                    `Parabéns meu amor, o ano acabou! Estou muito orgulhoso!! IHIIHIIHI ❤️❤️❤️ \nQue pena, que esqueceu ${naoTomado} dias mas nada para se preocupar, é muito banho em um ano só de qualquer jeito kkkkkk ❤️`
                );
            }
        }
        if (faltam !== 0) {
            alert(`Parabéns, faltam mais ${faltam} dias`);
        }
    }

    function banhoNaoTomado() {
        contadorSemBanho++;
        contadorDias++;
        saveItem("@banhoSemBanho", contadorSemBanho);
        saveItem("@banhoDays", contadorDias);
        setCountDias(countDias + 1);
        setNaoTomado(naoTomado + 1);

        alert(
            "Poxa que pena! Espero que amanha tome um banho bem gostoso para continuar a contagem"
        );
    }

    function passarAno() {
        setCount(0);
        setCountDias(0);
        setNaoTomado(0);
        setCountAno(0);
        deleteItem("@banhos");
        deleteItem("@banhoDays");
        deleteItem("@banhoSemBanho");
    }

    function diminuir() {
        removeItem("@banhos", contador);
        removeItem("@banhoDays", contadorDias);
        setCount(count - 1);
        setCountDias(countDias - 1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTexto}>
                <Text style={styles.title1}>Projeto {max} banhos </Text>
                <Text style={styles.title2}>
                    Contador de banhos da gatinha Vivi
                </Text>
            </View>
            <View style={styles.containerImage}>
                <Image
                    source={require("../../assets/gatos_banho.jpeg")}
                    style={styles.image}
                />
            </View>
            <Text style={styles.textoGrande}>A gatinha tomou banho hoje?</Text>
            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonNao]}
                    onPress={banhoNaoTomado}
                    onLongPress={diminuir}
                >
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        NÃO
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={banhoTomado}
                    onLongPress={passarAno}
                >
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        SIM
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.contador}>
                {count ?? 0}/{max}
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
