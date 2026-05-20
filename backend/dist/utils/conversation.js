const MAX_HISTORY_MESSAGES = 12;
export function trimConversationHistory(messages) {
    if (messages.length <= MAX_HISTORY_MESSAGES) {
        return messages;
    }
    return messages.slice(-MAX_HISTORY_MESSAGES);
}
