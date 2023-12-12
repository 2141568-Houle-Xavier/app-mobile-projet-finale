import { PermissionsAndroid, Platform } from 'react-native';

const RequetePermission = async () => {
    if (Platform.OS !== 'android') {
        // Handle non-Android platforms
        console.log('This function is intended for Android only.');
        return false;
    }

    const permissionStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (permissionStatus === true) {
        // Permission already granted
        console.log('Permission already granted.');
        return true;
    }

    // Permission not granted, proceed with request
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            title: "Permission de Localisation",
            message: "L'application demande votre permission pour accéder à votre localisation",
            buttonPositive: "Autoriser",
            buttonNegative: "Annuler",
        }
    );

    console.log('Permission request result:', granted);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
    } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Permission denied.');
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Permission denied with "Never ask again" option selected.');
    }

    return false;
};

export default RequetePermission;