import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";

import * as Clipboard from "expo-clipboard";

import useStorage from "../../hooks/useStorage";

export function ModalPassword({ password, handleClose }) {
    const { saveItem } = useStorage();

    async function handleCopyPasswrod() {
        await Clipboard.setStringAsync(password);
        await saveItem("@pass", password);

        alert("Senha salva com sucesso");

        handleClose();
    }

    async function handleSavePassword() {
        await saveItem("@pass", password);

        handleClose();
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha gerada</Text>

                <Pressable
                    style={styles.innerPasswrod}
                    onLongPress={handleCopyPasswrod}
                >
                    <Text style={styles.text}>{password}</Text>
                </Pressable>

                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleClose}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonSave]}
                        onPress={handleSavePassword}
                    >
                        <Text style={styles.buttonSaveText}>Salvar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24,24,24,0.6)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        backgroundColor: "#fff",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 24,
    },
    innerPasswrod: {
        backgroundColor: "#0e0e0e",
        width: "90%",
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 8,
    },
    text: {
        color: "#fff",
        textAlign: "center",
    },
    buttonArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 8,
        alignItems: "center",
    },
    button: {
        flex: 1,
        alignItems: "center",
        marginBottom: 14,
        marginTop: 14,
        padding: 8,
    },
    buttonSave: {
        backgroundColor: "#392de9",
        borderRadius: 8,
    },
    buttonSaveText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
