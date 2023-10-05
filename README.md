Titel:
GymApp

Beskrivning:
Ett enkelt verktyg för att hämta hem olika gymövningar från ett externt api och spara dem i en lokal databas så
att de senare är lättåtkomliga för användaren.

Setup:
Du behöver ha node.js installerat.
Kör npm install npm@latest.
Kör npm update.
För att starta i Expomiljö, kör npx expo start.

Navigation:
Jag har använt createBottomTabNavigator och createNativeStackNavigator från React Navigation för att skapa dina navigationskomponenter.

Använda React Native Komponenter:
View
Text
Button
StyleSheet
ScrollView
Alert
TouchableOpacity

Använda Expo Komponenter:
LinearGradient
Checkbox
Audio
MapView
AsyncStorage
StatusBar
KeepAwake
UseFonts

Andra Externa Komponenter:
Jag har använt mig av en hel del React Native Paper-Komponenter för att designa en stor del av UI i mitt projekt.

Web-API:
Min applikation skickar fetch requests till ett api som finns på https://api-ninjas.com/api/exercises
