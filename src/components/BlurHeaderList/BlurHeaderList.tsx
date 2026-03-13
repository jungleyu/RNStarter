import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import useBlurHeaderList from "./useBlurHeaderList";
import { BlurView } from "@react-native-community/blur";
import { useMemo } from "react";

export default function BlurHeaderList(props: any) {
    const {
        ScrollComponent = ScrollView,
        Header = null,
        Banner = null,
        bannerOffset = 0,
        ...rest
    } = props;

    const AnimatedScrollComponent = useMemo(() => Animated.createAnimatedComponent(ScrollComponent), [ScrollComponent])

    const { height } = useWindowDimensions();
    const {
        scrollY,
        scrollHandler
    } = useBlurHeaderList();

    const bannerHeight = useSharedValue(bannerOffset);

    const blurStyle = useAnimatedStyle(() => {
        const blurOpacity = interpolate(Math.abs(scrollY.value), [0, bannerHeight.value], [0, 1], 'clamp');

        return { opacity: blurOpacity };
    });

    const bannerTranslationStyle = useAnimatedStyle(() => {
        const bannerTranslation = interpolate(
            scrollY.value,
            [0, bannerOffset],
            [0, -bannerOffset],
            'clamp'
        );

        return { transform: [{ translateY: bannerTranslation }] };
    });

    const animatedScaleStyle = useAnimatedStyle(() => {
        const bannerHeightRatio = height / bannerHeight.value;

        const scaleY = interpolate(
            scrollY.value,
            [0, -(height + bannerHeight.value)],
            [1, bannerHeightRatio],
            'clamp'
        );

        return {
            transform: [{ scaleY }, { scaleX: scaleY }],
        };
    }, [height]);

    return <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Animated.View style={[StyleSheet.absoluteFill, bannerTranslationStyle,]}>
                <Animated.View
                    style={animatedScaleStyle}>
                    <View style={{ marginBottom: -bannerOffset }}>
                        <Animated.View style={[StyleSheet.absoluteFill, styles.blurStyle, blurStyle,]}>
                            <BlurView style={StyleSheet.absoluteFill} blurAmount={50} blurType='light' />
                        </Animated.View>
                        {Banner}
                    </View>
                </Animated.View>
            </Animated.View>
            {Header}
        </View>
        <AnimatedScrollComponent
            {...rest}
            scrollEventThrottle={16}
            overScrollMode="auto"
            contentContainerStyle={{ paddingTop: bannerOffset, }}
            onScroll={scrollHandler}
        />
    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        position: 'relative',
        zIndex: 1,
    },
    blurStyle: {
        zIndex: 1,
    }
})