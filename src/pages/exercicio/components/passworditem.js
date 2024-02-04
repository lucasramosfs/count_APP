import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export function PasswordItem({ data, removePassword }) {
    return (
        <Pressable onLongPress={removePassword} style={styles.container}>
            <Text style={styles.text}>{data}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
        backgroundColor: "#0e0e0e",
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        color: "#fff",
    },
});
