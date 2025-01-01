import matter from 'gray-matter'

export async function loadMarkdownFile(filePath: string) {
  try {
    const response = await fetch(filePath)
    const markdown = await response.text()
    const { data, content } = matter(markdown)
    return {
      metadata: data,
      content
    }
  } catch (error) {
    console.error(`Error loading markdown file: ${filePath}`, error)
    return null
  }
}

export async function loadAllMarkdownFiles(context: Record<string, any>) {
  const files = []
  for (const key of Object.keys(context)) {
    const filePath = context[key]
    const content = await loadMarkdownFile(filePath)
    if (content) {
      files.push({
        path: key,
        ...content
      })
    }
  }
  return files
} 