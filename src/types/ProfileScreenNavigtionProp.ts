import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList } from "./RootTabNavigation";
import { RootStackParamList } from "./RootStackNavigation";

export type ProfileScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList>,
    NativeStackNavigationProp<RootStackParamList>
>