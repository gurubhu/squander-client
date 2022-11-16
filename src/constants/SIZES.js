import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const SIZES ={
    padding: 24,
    base: 8,
    h1: 30,
    h2: 22,
    h3: 16,
    radius: 12,
    // app dimensions
    width,
    height
}

export default SIZES;