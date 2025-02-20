import { use, useRef, useState } from "react";
import { Searchbar } from "react-native-paper";
import { SearchContainer } from "../theme/styles";
import { View, TextInput, Picker } from "react-native";

/**
 * Aditional params:
 *  - Strings:
 *       + "contains" mode: Filtra los elementos cuyo field contenga exactamente el texto introducido.
 *       + "regex" mode: Filtra los elementos cuyo field cumpla con el regex especificado.
 *       + "exact" mode: Filtra los elementos cuyo field coincida exactamente con el texto introducido.
 *  - Numeric:
 *       + "eq": Valores numéricos iguales
 *       + "gt": Valores numéricos mayores que
 *       + "gte": Valores numéricos mayores o iguales que
 *       + "lt": Valores numéricos menores que
 *       + "lte": Valores numéricos menores o iguales que
 *  - Selection:
 *       + Array con los posibles valores
 */
export const FilterComponent = ({
  colection, // Colección de elementos a filtrar
  setFilterColection, // Hook para modificar los elementos filtrados
  filters, // Array de arrays de la forma [field, type, aditional params]
}) => {
  return (
    <SearchContainer>
      {filters.forEach((f) => {
        switch (f[1]) {
          case "string":
            <StringFilter
              colection={colection}
              setFilterColection={setFilterColection}
              field={f[0]}
              mode={f[2]}
            />;
            break;
          case "numeric":
            <NumericFilter
              colection={colection}
              setFilterColection={setFilterColection}
              field={f[0]}
              mode={f[2]}
            />;
            break;
          case "selection":
            <SelectionFilter
              colection={colection}
              setFilterColection={setFilterColection}
              field={f[0]}
              options={f[2]}
            />;
            break;
        }
      })}
    </SearchContainer>
  );
};

const NumericFilter = ({ colection, setFilterColection, field, mode }) => {
  const [number, setNumber] = useState();

  const handleNumberChange = (number) => {
    setNumber(number);
    switch (mode) {
      case "eq":
        setFilterColection(colection.filter((item) => item[field] === number));
        break;
      case "gt":
        setFilterColection(colection.filter((item) => item[field] > number));
        break;
      case "gte":
        setFilterColection(colection.filter((item) => item[field] >= number));
        break;
      case "lt":
        setFilterColection(colection.filter((item) => item[field] < number));
        break;
      case "lte":
        setFilterColection(colection.filter((item) => item[field] <= number));
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <TextInput
        keyboardType="numeric" // Teclado numérico
        value={number}
        onChangeText={handleNumberChange}
        placeholder={field}
      />
    </View>
  );
};

const StringFilter = ({ colection, setFilterColection, field, mode }) => {
  const [str, setStr] = useState("");

  const handleNumberChange = (str) => {
    setStr(str);
    switch (mode) {
      case "contains":
        setFilterColection(
          colection.filter((item) => item[field].includes(str)),
        );
        break;
      case "regex":
        setFilterColection(
          colection.filter((item) => item[field].match(str) != null),
        );
        break;
      case "exact":
        setFilterColection(colection.filter((item) => item[field] === str));
        break;
      default:
        break;
    }
  };

  return (
    <View>
      <TextInput
        value={str}
        onChangeText={handleNumberChange}
        placeholder={field}
      />
    </View>
  );
};

const SelectionFilter = ({ colection, setFilterColection, field, options }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelection = (value) => {
    setSelectedValue(value);
    setFilterColection(colection.filter((item) => item[field] === value));
  };

  return (
    <View>
      <Picker selectedValue={selectedValue} onValueChange={handleSelection}>
        <Picker.Item label="Todos" value="" />
        {options.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
};
