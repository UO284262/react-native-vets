import React, { useContext } from "react";
import { Marker, Callout } from "react-native-maps";
import { LocationContext } from "../services/location.context";
import { VetInfoCompactComponent } from "../components/vet-info-compact-card.component";
import { SearchComponent } from "../components/search.component";
import { VetsContext } from "../services/vets.context";
import { Map } from "../theme/styles";

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { vets } = useContext(VetsContext);
  const { lat, lng } = location;
  return (
    <>
      <SearchComponent from="map" />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.02,
        }}
      >
        {vets.map((item) => {
          return (
            <Marker
              key={item.name}
              title={item.name}
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate("Vets", {
                    screen: "VetDetailScreen",
                    params: {
                      vet: item,
                    },
                  })
                }
              >
                <VetInfoCompactComponent vet={item} />
              </Callout>
            </Marker>
          );
        })}
      </Map>
    </>
  );
};
