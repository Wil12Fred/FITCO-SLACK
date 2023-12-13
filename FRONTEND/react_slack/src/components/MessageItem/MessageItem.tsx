export const MessageItem = ({
    message,
}: any) => {
    return (
        <li key={message.messageId.toString()}>
            <div className="conversation-list">
                <div className="ctext-wrap">
                    <div className="ctext-wrap-content">
                        <h5 className="conversation-name">
                            <a href="#" className="user-name">{message.username}</a>
                            <span className="time">10:06</span></h5>
                        <p className="mb-0">
                            {message.text}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};