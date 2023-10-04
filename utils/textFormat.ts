export function formatString(str: string) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatMuscleName(name: string) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatInstructions(instructions: string) {
  return instructions.replace(/\.\s*/g, (match, offset) => {
    return offset % 2 === 0 ? ".\n\n" : ".\n";
  });
}

export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  } else {
    const truncatedStr = str.slice(0, maxLength - 3);
    const lastSpaceIndex = truncatedStr.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      return truncatedStr.slice(0, lastSpaceIndex) + "...";
    } else {
      return truncatedStr + "...";
    }
  }
}

export const muscleOptions = [
  { value: "abdominals", label: "Abdominals" },
  { value: "abductors", label: "Abductors" },
  { value: "adductors", label: "Adductors" },
  { value: "biceps", label: "Biceps" },
  { value: "calves", label: "Calves" },
  { value: "chest", label: "Chest" },
  { value: "forearms", label: "Forearms" },
  { value: "glutes", label: "Glutes" },
  { value: "hamstrings", label: "Hamstrings" },
  { value: "lats", label: "Lats" },
  { value: "lower_back", label: "Lower Back" },
  { value: "middle_back", label: "Middle Back" },
  { value: "neck", label: "Neck" },
  { value: "quadriceps", label: "Quadriceps" },
  { value: "traps", label: "Traps" },
  { value: "triceps", label: "Triceps" },
];
