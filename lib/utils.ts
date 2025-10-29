export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]): string {
  const classes: string[] = []

  for (const input of inputs) {
    if (!input) continue

    if (typeof input === "string") {
      classes.push(input)
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key)
      }
    }
  }

  // Simple merge of Tailwind classes (remove duplicates, keep last)
  const classMap = new Map<string, string>()
  for (const cls of classes) {
    const parts = cls.split(" ")
    for (const part of parts) {
      if (part) {
        const key = part.replace(/^(.*?)-/, "$1-")
        classMap.set(key, part)
      }
    }
  }

  return Array.from(classMap.values()).join(" ")
}
