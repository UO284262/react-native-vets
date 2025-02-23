import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput, Button, Surface } from "react-native-paper";
import { SearchContainer } from "../theme/styles";

/**
 * colection: Colección de elementos a filtrar
 * setFilterColection: Método set de un useState para filtrar las colecciones
 * filters: Array de filtros que se quieren crear. Este array tendrá la siguiente forma:
 *  - Para filtros de tipo string:
 *      + ['fieldName', 'string', 'mode']
 *      + Modes:
 *          - 'contains': Presencia de texto
 *          - 'regex': Coincidencia con la expresión regular
 *          - 'exact': Coincidencia exacta del texto
 *  - Para filtros de tipo numérico:
 *      + ['fieldName', 'numeric', 'mode']
 *      + Modes: gt, gte, lt, lte, eq
 *  - Para filtros de tipo selection:
 *      + ['fieldName', 'selection', ['values','options']]
 * styles: Estilo que se va a aplicar a los inputs
 * buttonSyle: Estilo que se va a aplicar a los botones
 */
export const FilterComponent = ({
  colection,
  setFilterColection,
  filters,
  style,
  buttonStyle,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (field, value) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    let filtered = colection;
    filters.forEach(([field, type, modeOrOptions]) => {
      const value = filterValues[field];
      if (value === undefined || value === "" || value === "all") {
        return;
      }

      if (type === "string") {
        if (modeOrOptions === "contains") {
          filtered = filtered.filter((item) =>
            item[field].toString().toLowerCase().includes(value.toLowerCase()),
          );
        } else if (modeOrOptions === "regex") {
          try {
            const regex = new RegExp(value);
            filtered = filtered.filter((item) => regex.test(item[field]));
          } catch (e) {}
        } else if (modeOrOptions === "exact") {
          filtered = filtered.filter((item) => item[field] === value);
        }
      } else if (type === "numeric") {
        const num = Number(value);
        if (isNaN(num)) {
          return;
        }
        if (modeOrOptions === "eq") {
          filtered = filtered.filter((item) => item[field] === num);
        } else if (modeOrOptions === "gt") {
          filtered = filtered.filter((item) => item[field] > num);
        } else if (modeOrOptions === "gte") {
          filtered = filtered.filter((item) => item[field] >= num);
        } else if (modeOrOptions === "lt") {
          filtered = filtered.filter((item) => item[field] < num);
        } else if (modeOrOptions === "lte") {
          filtered = filtered.filter((item) => item[field] <= num);
        }
      } else if (type === "selection") {
        filtered = filtered.filter((item) => item[field] === value);
      }
    });
    setFilterColection(filtered);
  };

  return (
    <SearchContainer>
      <Button
        mode="contained"
        onPress={() => setExpanded(!expanded)}
        style={buttonStyle}
      >
        {expanded ? "Ocultar filtros" : "Mostrar filtros"}
      </Button>
      <View style={[{ display: expanded ? "flex" : "none" }, style]}>
        {filters.map((f, index) => {
          const [field, type, modeOrOptions] = f;
          if (type === "string") {
            return (
              <StringFilter
                key={index}
                field={field}
                mode={modeOrOptions}
                onChange={(value) => handleFilterChange(field, value)}
              />
            );
          } else if (type === "numeric") {
            return (
              <NumericFilter
                key={index}
                field={field}
                mode={modeOrOptions}
                onChange={(value) => handleFilterChange(field, value)}
              />
            );
          } else if (type === "selection") {
            return (
              <SelectionFilter
                key={index}
                field={field}
                options={modeOrOptions}
                onChange={(value) => handleFilterChange(field, value)}
              />
            );
          } else {
            return null;
          }
        })}
        <Button mode="contained" onPress={applyFilters} style={buttonStyle}>
          Filtrar
        </Button>
      </View>
    </SearchContainer>
  );
};

const StringFilter = ({ field, mode, onChange, style }) => {
  const [str, setStr] = useState("");

  const handleTextChange = (text) => {
    setStr(text);
    onChange(text);
  };

  return (
    <Surface style={style}>
      <TextInput
        label={`Filtrar ${field} por ${
          mode === "contains"
            ? "coincidencia"
            : mode === "regex"
              ? "expresión regular"
              : "coincidencia exacta"
        }`}
        value={str}
        onChangeText={handleTextChange}
        placeholder={`Buscar en ${field}`}
        mode="outlined"
      />
    </Surface>
  );
};

const NumericFilter = ({ field, mode, onChange, style }) => {
  const [number, setNumber] = useState("");

  const handleNumberChange = (text) => {
    setNumber(text);
    onChange(text);
  };

  const modeText =
    mode === "eq"
      ? "igual a"
      : mode === "gt"
        ? "mayor que"
        : mode === "gte"
          ? "mayor o igual que"
          : mode === "lt"
            ? "menor que"
            : "menor o igual que";

  return (
    <Surface style={style}>
      <TextInput
        label={`Filtrar ${field} ${modeText}`}
        keyboardType="numeric"
        value={number}
        onChangeText={handleNumberChange}
        placeholder={`Ingrese un número`}
        mode="outlined"
      />
    </Surface>
  );
};

const SelectionFilter = ({ field, options = [], onChange, style }) => {
  const [selectedValue, setSelectedValue] = useState("all");

  const handleSelection = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Surface style={style}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(value) => handleSelection(value)}
      >
        <Picker.Item label={`Todos los ${field}`} value="all" />
        {options.map((opt, index) => (
          <Picker.Item key={index} label={opt.toString()} value={opt} />
        ))}
      </Picker>
    </Surface>
  );
};
