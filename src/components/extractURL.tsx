import { Linking, Text } from "react-native";

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

function extractURL(content: string) {
  const renderText = (content: string) =>
    content?.split(" ").map((part, index) =>
      URL_REGEX.test(part) ? (
        <Text
          key={index}
          style={{
            color: "#58a6ff",
          }}
          onPress={() => Linking.openURL(part)}
        >
          {part + " "}
        </Text>
      ) : (
        part + " "
      )
    );

  return renderText(content);
}

export default extractURL;
