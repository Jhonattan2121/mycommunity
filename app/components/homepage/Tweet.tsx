import { Box, Text, HStack, Button, Avatar, Link, Flex } from '@chakra-ui/react';
import { Comment, Discussion } from '@hiveio/dhive';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import DOMPurify from 'dompurify';
import { useComments } from '@/hooks/useComments';
import { FaHeart, FaRegComment, FaRegHeart, FaShare } from "react-icons/fa";

interface TweetProps {
    comment: Comment,
    onOpen: () => void;
    setReply: (comment: Comment) => void;
    setConversation: (conversation: Comment) => void;
}

const Tweet = ({ comment, onOpen, setReply, setConversation }: TweetProps ) => {
    // Sanitize the comment body to remove any invalid HTML tags or attributes
    const sanitizedBody = DOMPurify.sanitize(comment.body);
    console.log(comment, 'comment');
    const replies = useComments(comment.author, comment.permlink);
    console.log(replies.comments.length, 'replies');

    function handleReplyModal() {
        setReply(comment)
        onOpen()
    }

    function handleConversation() {
        setConversation(comment)
    }

    return (
        <Box bg="muted" p={4} mt={1} mb={1} borderRadius="md">
            <HStack mb={2}>
                <Avatar size="sm" name={comment.author} />
                <Link href={`/profile/${comment.author}`} fontWeight="bold" mb={2}>
                    {comment.author}
                </Link>
            </HStack>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {sanitizedBody}
            </ReactMarkdown>
            <HStack justify="space-between" mt={3}>
                <Button leftIcon={<FaRegHeart />} variant="ghost">{comment.net_votes}</Button>
                <HStack>
                    <FaRegComment onClick={handleReplyModal} cursor="pointer" />
                    <Text onClick={handleConversation} cursor="pointer" fontWeight="bold" >{replies.comments.length}</Text>
                </HStack>
                <Button leftIcon={<FaShare />} variant="ghost"></Button>
            </HStack>
        </Box>
    );
}

export default Tweet;
