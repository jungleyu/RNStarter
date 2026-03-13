import { SectionList, Image, StyleSheet, Text, } from "react-native"
import Breadcrumb from "../components/Breadcrumb";
import { useCallback, useMemo } from "react";

import BlurHeaderList from "../components/BlurHeaderList/BlurHeaderList";
import { Header } from "@react-navigation/elements";
import { useLingui } from "@lingui/react/macro";

export default function Profile() {
    const { t } = useLingui()
    const data: Array<{ data: number[] }> = useMemo(() => [{ data: Array.from({ length: 50 }) }], []);

    const renderSectionHeader = useCallback(() => <Text style={styles.sectionHeader}>Hello world</Text>, []);

    const renderHeader = useCallback(() => {
        return <Header
            title={t`Me`}
            headerTransparent
            headerTitleAlign="center"
            headerLeft={Breadcrumb} />
    }, [t]);

    const renderBanner = useCallback(() => {
        return <Image source={require('../../assets/images/profile.png')}
            resizeMode='cover'
            resizeMethod='scale'
            style={styles.banner} />
    }, []);

    const renderItem = useCallback(({ index }: { index: number }) => {
        return <Text style={styles.item}>{index}</Text>
    }, [])

    return <BlurHeaderList
        ScrollComponent={SectionList}
        Header={renderHeader()}
        Banner={renderBanner()}
        bannerOffset={128}
        sections={data}
        renderItem={renderItem}
        stickySectionHeadersEnabled
        renderSectionHeader={renderSectionHeader}
    />
    // return <BlurHeaderList
    //     ScrollComponent={ScrollView}
    //     Header={renderHeader()}
    //     Banner={renderBanner()}
    //     bannerOffset={128}
    // >
    //     {
    //         data[0].data.map((_, index) => renderItem({ index }))
    //     }
    // </BlurHeaderList>
}

const styles = StyleSheet.create({
    sectionHeader: { lineHeight: 64, fontSize: 24, paddingHorizontal: 12 },
    item: { lineHeight: 48, paddingHorizontal: 12, fontSize: 18 },
    banner: { width: '100%', height: '100%' }
})
