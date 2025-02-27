import { useFonts } from "expo-font";
import { createContext, useContext } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native";

const FontContext = createContext({})

export function FontProvider({ children }) {

    const [loaded, error] = useFonts({
        regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
        bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
        black: require("../../assets/fonts/Montserrat-Black.ttf"),
        semibold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
        light: require("../../assets/fonts/Montserrat-Light.ttf"),
    });

    if (!loaded && !error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20, marginTop: 15 }}>
                    Carregando as Fontes
                </Text>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return <FontContext.Provider value={{ loaded }}>{children}</FontContext.Provider>;
}

export function useFont() {
    const context = useContext(FontContext)
    if (!context) {
        throw new Error("useFont must be used within a FontProvider");
    }
    return context;
}