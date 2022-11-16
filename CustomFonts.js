import * as Font from 'expo-font';

let customFonts = {
    'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
}

const _loadFontsAsync = async ()=>{
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
}

export default _loadFontsAsync;
