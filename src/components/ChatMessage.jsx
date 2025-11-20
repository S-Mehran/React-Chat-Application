import { Card } from "react-bootstrap";

export function ChatMessage({ text, sender, timestamp }) {
  const isUser = sender === "sender";

  const formatTime = (date) => {
    if (!(date instanceof Date)) date = new Date(date);
    if (isNaN(date.getTime())) return "--";
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={`d-flex mb-3 ${
        isUser ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <div style={{ maxWidth: "70%" }}>
        <Card
          bg={isUser ? "primary" : "light"}
          text={isUser ? "white" : "dark"}
        >
          <Card.Body className="py-2 px-3">
            <Card.Text className="mb-1">{text}</Card.Text>
            <small className={`${isUser ? "text-white-50" : "text-muted"}`}>
              {formatTime(timestamp)}
            </small>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}