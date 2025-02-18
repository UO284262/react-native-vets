import { useState } from "react";
import { ScrollView, Share } from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { List, Divider } from "react-native-paper";

import { VetInfoCardComponent } from "../components/vet-info-card.component";
import { ButtonsSpace, ContactButton } from "../theme/styles";

export const VetDetailScreen = ({ route }) => {
  const [healthServicesExpanded, setHealthServicesExpanded] = useState(true);
  const [otherServicesExpanded, setOtherServicesExpanded] = useState(true);

  const iconHealthServices = () => (
    <List.Icon color="green" icon="hospital-building" />
  );
  const iconOtherServices = () => (
    <List.Icon color="green" icon="dog-service" />
  );
  const iconDiagnosisTest = () => <List.Icon color="green" icon="test-tube" />;
  const iconVaccination = () => <List.Icon color="green" icon="needle" />;
  const iconIdentification = () => (
    <List.Icon color="green" icon="identifier" />
  );
  const iconInternalMedicine = () => (
    <List.Icon color="green" icon="medical-bag" />
  );
  const iconHairdressing = () => <List.Icon color="green" icon="hair-dryer" />;
  const iconShop = () => <List.Icon color="green" icon="store-plus" />;
  const iconAcupuncture = () => (
    <List.Icon color="green" icon="cursor-pointer" />
  );

  const hasDiagnosticTests = () => {
    return (
      <>
        <List.Item title="Diagnostic Tests" left={iconDiagnosisTest} />
        <Divider />
      </>
    );
  };

  const hasVaccination = () => {
    return (
      <>
        <List.Item title="Vaccination" left={iconVaccination} />
        <Divider />
      </>
    );
  };

  const hasIdentification = () => {
    return (
      <>
        <List.Item title="Identification" left={iconIdentification} />
        <Divider />
      </>
    );
  };

  const hasInternalMedicine = () => {
    return (
      <>
        <List.Item title="Internal Medicine" left={iconInternalMedicine} />
        <Divider />
      </>
    );
  };

  const hasHairdressing = () => {
    return (
      <>
        <List.Item title="Hairdressing" left={iconHairdressing} />
        <Divider />
      </>
    );
  };

  const hasShop = () => {
    return (
      <>
        <List.Item title="Shop" left={iconShop} />
        <Divider />
      </>
    );
  };

  const hasAcupuncture = () => {
    return (
      <>
        <List.Item title="Acupuncture" left={iconAcupuncture} />
        <Divider />
      </>
    );
  };

  const { vet } = route.params;
  return (
    <>
      <VetInfoCardComponent vet={vet} />
      <ScrollView>
        <List.Accordion
          title="Health Services"
          left={iconHealthServices}
          expanded={healthServicesExpanded}
          onPress={() => setHealthServicesExpanded(!healthServicesExpanded)}
        >
          {vet.services.includes("diagnostic tests") && hasDiagnosticTests()}
          {vet.services.includes("vaccination") && hasVaccination()}
          {vet.services.includes("identification") && hasIdentification()}
          {vet.services.includes("internal medicine") && hasInternalMedicine()}
        </List.Accordion>
        <List.Accordion
          title="Other Services"
          left={iconOtherServices}
          expanded={otherServicesExpanded}
          onPress={() => setOtherServicesExpanded(!otherServicesExpanded)}
        >
          {vet.services.includes("hairdressing") && hasHairdressing()}
          {vet.services.includes("shop") && hasShop()}
          {vet.services.includes("acupuncture") && hasAcupuncture()}
        </List.Accordion>
      </ScrollView>
      <ButtonsSpace>
        <ContactButton
          icon="phone"
          onPress={() => Linking.openURL("tel:" + vet.phone)}
        >
          Call
        </ContactButton>
        <ContactButton
          icon="email"
          onPress={() => Linking.openURL("mailto:" + vet.email)}
        >
          Mail
        </ContactButton>
        <ContactButton
          icon="web"
          onPress={() => WebBrowser.openBrowserAsync(vet.webSite)}
        >
          Web
        </ContactButton>
        <ContactButton
          icon="share"
          onPress={() => Share.share({ message: "Check it: " + vet.webSite })}
        >
          Share
        </ContactButton>
      </ButtonsSpace>
    </>
  );
};
