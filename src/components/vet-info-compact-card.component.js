import { Text } from "../theme/typography";
import { CompactWebview, Item } from "../theme/styles";

export const VetInfoCompactComponent = ({ vet }) => {
  return (
    <Item>
      <CompactWebview source={{ uri: vet.photo }} />
      <Text center variant="caption" numberOfLines={3}>
        {vet.name}
      </Text>
    </Item>
  );
};
