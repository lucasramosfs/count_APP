import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    //buscar itens salvos
    const getItem = async (key) => {
        try {
            const days = await AsyncStorage.getItem(key);
            return JSON.parse(days) || [0];
        } catch (error) {
            console.log("Erro ao buscar", error);
            return [];
        }
    };

    //salvar um item no storage
    const saveItem = async (key, value) => {
        try {
            let days = await getItem(key);

            days.push(value);

            await AsyncStorage.setItem(key, JSON.stringify(days));
        } catch (error) {
            console.log("Erro ao salvar", error);
        }
    };

    //remover algo do storage
    const removeItem = async (key, item) => {
        try {
            let days = await getItem(key);

            let removeDay = days.filter((days) => {
                return days !== item;
            });

            await AsyncStorage.setItem(key, JSON.stringify(removeDay));
            return removeDay;
        } catch (error) {
            console.log("Erro ao deletar", error);
        }
    };

    const deleteItem = async (key) => {
        try {
            let days = await getItem(key);
            for (let i = 0; i < days.length; i++) {
                days.pop();
            }
            days = [0];
            await AsyncStorage.setItem(key, JSON.stringify(days));
            return days;
        } catch (error) {
            console.log("Erro ao deletar", error);
        }
    };

    return {
        saveItem,
        getItem,
        removeItem,
        deleteItem,
    };
};

export default useStorage;
