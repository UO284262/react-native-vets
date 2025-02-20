import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
    TextInput,
    Button,
    Surface,
    HelperText,
} from "react-native-paper";
import { SearchContainer } from "../theme/styles";

export const FilterComponent = ({
    colection,
    setFilterColection,
    filters,
    style,
    buttonStyle,
}) => {
    // Estado para controlar la visibilidad de los filtros
    const [expanded, setExpanded] = useState(true);
    // Estado centralizado para guardar el valor de cada filtro, por campo
    const [filterValues, setFilterValues] = useState({});

    // Actualiza el valor de un filtro específico
    const handleFilterChange = (field, value) => {
        setFilterValues((prev) => ({ ...prev, [field]: value }));
    };

    // Función que aplica todos los filtros sobre la colección original
    const applyFilters = () => {
        let filtered = colection;
        filters.forEach(([field, type, modeOrOptions]) => {
            const value = filterValues[field];
            // Si el filtro está vacío, es "all" o no se ha modificado, se ignora
            if (value === undefined || value === "" || value === "all") return;

            if (type === "string") {
                if (modeOrOptions === "contains") {
                    filtered = filtered.filter((item) =>
                        item[field]
                            .toString()
                            .toLowerCase()
                            .includes(value.toLowerCase())
                    );
                } else if (modeOrOptions === "regex") {
                    try {
                        const regex = new RegExp(value);
                        filtered = filtered.filter((item) => regex.test(item[field]));
                    } catch (e) {
                        // Si la expresión regular es inválida, no se filtra
                    }
                } else if (modeOrOptions === "exact") {
                    filtered = filtered.filter((item) => item[field] === value);
                }
            } else if (type === "numeric") {
                const num = Number(value);
                if (isNaN(num)) return;
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
            {/* Mantenemos los filtros montados, ocultándolos con estilos */}
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
                                options={modeOrOptions} // Aquí modeOrOptions es el array de opciones
                                onChange={(value) => handleFilterChange(field, value)}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
                {/* Botón para aplicar todos los filtros de una vez */}
                <Button
                    mode="contained"
                    onPress={applyFilters}
                    style={{ marginTop: 10 }}
                >
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
                label={`Filtrar ${field} por ${mode === "contains"
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
