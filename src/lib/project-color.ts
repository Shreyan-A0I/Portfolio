const GRADIENTS = [
  "from-blue-600 to-cyan-600",
  "from-purple-600 to-pink-600",
  "from-green-600 to-emerald-600",
  "from-orange-600 to-red-600",
  "from-indigo-600 to-blue-600",
  "from-rose-600 to-pink-600",
  "from-amber-600 to-orange-600",
  "from-teal-600 to-cyan-600",
  "from-violet-600 to-purple-600",
];

export function getProjectGradient(title: string): string {
  return GRADIENTS[title.charCodeAt(0) % GRADIENTS.length];
}
