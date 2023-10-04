export function useFetchExerciseFromApi(selectedMuscle: string | null) {
  const fetchExercises = async () => {
    if (!selectedMuscle) {
      return [];
    }

    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscle}`;
    const apiKey = "pEP2H7hUlKEU4Y53Bkk86XGUOhfhbOaHOh0MNaUW";

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "x-api-key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching exercises from the API:", error);
      return [];
    }
  };

  return { fetchExercises };
}
