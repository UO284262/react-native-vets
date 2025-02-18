import { SvgXml } from "react-native-svg";
import close from "../../assets/close";
import open from "../../assets/open";
import star from "../../assets/star";
import { Text } from "../theme/typography";
import { FavouriteComponent } from "./favourite.component";
import {
  VetCard,
  VetCardCover,
  Info,
  Details,
  Rating,
  IsOpened,
  Address,
  Icon,
} from "../theme/styles";

export const VetInfoCardComponent = ({ vet }) => {
  const ratingArray = Array.from(new Array(Math.floor(vet.rating)));
  return (
    <VetCard elevation={5}>
      <FavouriteComponent vet={vet} />
      <VetCardCover key={vet.name} source={{ uri: vet.photo }} />
      <Info>
        <Text variant="label">{vet.name}</Text>
        <Details>
          <Rating>
            {ratingArray.map((_, index) => (
              <SvgXml key={`star-${index}`} xml={star} width={20} height={20} />
            ))}
          </Rating>
          <IsOpened>
            {vet.openNow && <SvgXml xml={open} width={35} height={35} />}
            {!vet.openNow && <SvgXml xml={close} width={35} height={35} />}
          </IsOpened>
          <Icon source={require("../../assets/icon.png")} />
        </Details>
        <Address>{vet.address}</Address>
      </Info>
    </VetCard>
  );
};
