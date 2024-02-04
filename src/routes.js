import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Banho } from "./pages/banho";
import { Exercicio } from "./pages/exercicio";
import { Hot } from "./pages/hot";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Banho"
                component={Banho}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused, size }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    size={size}
                                    color="#7fffd4"
                                    name="water"
                                />
                            );
                        }
                        return (
                            <Ionicons
                                size={size}
                                color="#7fffd4"
                                name="water-outline"
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Exercicio"
                component={Exercicio}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused, size }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    size={size}
                                    color="#0000ff"
                                    name="walk-outline"
                                />
                            );
                        }
                        return (
                            <Ionicons size={size} color="#0000ff" name="walk" />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Hot"
                component={Hot}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused, size }) => {
                        if (focused) {
                            return (
                                <Ionicons
                                    size={size}
                                    color="#ff0000"
                                    name="flame"
                                />
                            );
                        }
                        return (
                            <Ionicons
                                size={size}
                                color="#ff0000"
                                name="flame-outline"
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}
