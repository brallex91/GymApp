import { Audio } from "expo-av";
import { useEffect, useState } from "react";

const buttonPushSound = require("../assets/buttonPush.mp3");

export function useButtonSound() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(buttonPushSound);
      if (isMounted) {
        setSound(sound);
      }
    };

    loadSound();

    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playButtonSound = async () => {
    if (sound) {
      await sound.replayAsync();
    }
  };

  return playButtonSound;
}
