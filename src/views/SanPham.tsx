import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TrangChu from "./TrangChu";
import ChiTietSanPham from "./ChiTietSanPham";
import ProfileUser from "./ProfileUser";

const ProductStack = createStackNavigator();
function SanPham({ route }) {
    const { user, goBack } = route.params;

    return (
        <NavigationContainer independent={true}>
            <ProductStack.Navigator initialRouteName="TrangChu" screenOptions={{ headerShown: false }}>
                <ProductStack.Screen name="TrangChu" component={TrangChu} initialParams={{ user, goBack }} />
                <ProductStack.Screen name="ChiTietSanPham" component={ChiTietSanPham} />
                <ProductStack.Screen name="ProfileUser" component={ProfileUser} />
            </ProductStack.Navigator>
        </NavigationContainer>
    );
}

export default SanPham;
