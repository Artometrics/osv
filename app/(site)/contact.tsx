import { Text, TextInput, View } from "react-native";
import { Wrapper } from "@/components/Wrapper";
import { PageSeo } from "@/components/PageSeo";

export default function ContactScreen() {
  return (
    <Wrapper variant="narrow" className="gap-4 py-10">
      <PageSeo
        title="Contact"
        description="Get in touch with the Hemingway editorial team."
        path="/contact"
      />
      <Text className="text-xs font-medium uppercase tracking-[1.8px] text-accent">
        Contact
      </Text>
      <Text className="font-serif text-4xl font-light text-fg">
        Say hello
      </Text>
      <Text className="font-sans text-base leading-7 text-muted">
        Pitch a guest, ask about membership, or just introduce yourself.
      </Text>
      <View className="mt-4 gap-3">
        <TextInput
          placeholder="Name"
          placeholderTextColor="#737373"
          className="border border-border bg-bg-elevated px-4 py-3 font-sans text-base text-fg"
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#737373"
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-border bg-bg-elevated px-4 py-3 font-sans text-base text-fg"
        />
        <TextInput
          placeholder="Message"
          placeholderTextColor="#737373"
          multiline
          numberOfLines={5}
          className="min-h-[140px] border border-border bg-bg-elevated px-4 py-3 font-sans text-base text-fg"
          style={{ textAlignVertical: "top" }}
        />
        <View className="self-start bg-fg px-5 py-3">
          <Text className="text-xs font-medium uppercase tracking-wide text-inverse">
            Send message
          </Text>
        </View>
      </View>
    </Wrapper>
  );
}
