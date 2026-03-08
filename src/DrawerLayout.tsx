import { ReactNode, useCallback, useState } from "react";
import { Text, useWindowDimensions } from "react-native";
import { Drawer } from "react-native-drawer-layout";

export default function DrawerLayout({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { width } = useWindowDimensions();

    const renderDrawerContent = useCallback(() => {
        return <Text>This is Drawer content</Text>
    }, []);

    return <Drawer
        drawerStyle={{ width: Math.min(400, width * 0.8) }}
        renderDrawerContent={renderDrawerContent}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}>
        {children}
    </Drawer>
}