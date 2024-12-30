import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

interface MarkdownContentProps {
  content: string
}

const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      className="markdown-content"
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownContent 