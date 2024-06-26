import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import React from "react";

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

const ItemCard = ({ item }) => {
    return (
        <View style={styles.boxContainer}>
            <TouchableOpacity>
                <ImageBackground
                    source={{ uri: item.ImageSource }}
                    style={styles.imageBackground}
                    resizeMode="cover">
                    <View style={styles.CardRatingContainer}>
                        <Text style={styles.CardRatingText}>⭐ {item.Rating}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.CardTitle}>{item.Name}</Text>
                <Text style={styles.CardSubtitle}>{item.ShortDescription}</Text>
            </TouchableOpacity>
            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                    <Text style={styles.CardPrice}>{item.Price.SizeMedium.toLocaleString()}đ</Text>
                </Text>
                <TouchableOpacity>
                    <Image source={require('../images/plus.png')} style={styles.iconStyle}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        padding: SPACING.space_15,
        margin: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: '#ECE7E7'
    },
    imageBackground: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_10,
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryBlackHex,
    },
    iconStyle: {
        width: 30,
        height: 30,
        resizeMode: "stretch"
    }
});

export default ItemCard;
