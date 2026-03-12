/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@rneui/themed";
import { styles as S } from "./styles";
import { LEAVE_REQUEST_CONFIG } from "../../config";
import ElevatedView from "react-native-elevated-view";
import { Fonts } from "@/assets";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { showToast } from "@/utils";

export type DocumentItem = {
  uri: string;
  name: string;
  mimeType?: string;
  size?: number;
};

export interface DocumentsInputProps {
  onChange?: (documents: DocumentItem[]) => void;
}

export const DocumentsInput = ({ onChange }: DocumentsInputProps) => {
  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const { theme } = useTheme();

  const pickDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        showToast("Document selection cancelled", "info");
        return;
      }

      setDocuments((prev) => {
        const existingKeys = new Set(
          prev.map((d) => `${d.name}-${d.size ?? 0}`)
        );

        const newlyAddedKeys = new Set<string>();
        const validDocs: DocumentItem[] = [];

        let duplicateCount = 0;
        let sizeRejectedCount = 0;

        for (const asset of result.assets) {
          const key = `${asset.name}-${asset.size ?? 0}`;

          if (existingKeys.has(key) || newlyAddedKeys.has(key)) {
            duplicateCount++;
            continue;
          }

          if (asset.size && asset.size > MAX_FILE_SIZE_BYTES) {
            sizeRejectedCount++;
            continue;
          }

          newlyAddedKeys.add(key);

          validDocs.push({
            uri: asset.uri,
            name: asset.name,
            mimeType: asset.mimeType ?? undefined,
            size: asset.size ?? undefined,
          });
        }

        if (validDocs.length > 0) {
          showToast(`${validDocs.length} document(s) added`, "success");
          const updated = [...prev, ...validDocs];
          if (onChange) onChange(updated);
          return updated;
        }

        if (duplicateCount > 0) {
          showToast("File already added", "error");
          if (onChange) onChange(prev);
          return prev;
        }

        if (sizeRejectedCount > 0) {
          showToast(`File exceeds ${MAX_FILE_SIZE_MB}MB limit`, "error");
          if (onChange) onChange(prev);
          return prev;
        }

        showToast("No valid documents added", "info");
        if (onChange) onChange(prev);
        return prev;
      });
    } catch (error) {
      console.log("Pick document error:", error);
      showToast("Failed to pick documents", "error");
    }
  };

  const openDocument = async (uri: string, name: string) => {
    try {
      if (!uri || !name) {
        showToast("Invalid file", "error");
        return;
      }

      const uniqueName = `${Date.now()}_${name}`;
      const destination = FileSystem.cacheDirectory + uniqueName;

      showToast("Downloading file...", "info");

      if (uri.startsWith("file://")) {
        await FileSystem.copyAsync({ from: uri, to: destination });
      } else {
        await FileSystem.downloadAsync(uri, destination);
      }

      showToast("File saved successfully", "success");
    } catch (error) {
      console.log("Download error:", error);
      showToast("Unable to download file", "error");
    }
  };

  const removeDocument = (uri: string) => {
    setDocuments((prev) => {
      const updated = prev.filter((doc) => doc.uri !== uri);
      if (onChange) onChange(updated);
      return updated;
    });
  };

  const _renderTitle = (title: string) => {
    return (
      <View style={StyleSheet.flatten([S.headerText])}>
        <Text style={StyleSheet.flatten([S.titleText])}>{title}</Text>
      </View>
    );
  };

  const _renderDocuments = () => {
    if (documents.length === 0) {
      return (
        <Text
          style={StyleSheet.flatten([
            S.valueName,
            { color: theme.colors.black, opacity: 0.5 },
          ])}
        >
          {LEAVE_REQUEST_CONFIG.addDocument}
        </Text>
      );
    }

    return (
      <View>
        {documents.map((doc) => (
          <View
            key={doc.uri}
            style={StyleSheet.flatten([
              S.documentRow,
              { borderBottomColor: theme.colors.background },
            ])}
          >
            <TouchableOpacity
              style={StyleSheet.flatten([S.documentLeft])}
              onPress={() => openDocument(doc.uri, doc.name)}
            >
              <FontAwesome5
                name="file-pdf"
                size={20}
                color={theme.colors.primary}
              />
              <Text
                style={StyleSheet.flatten([S.documentName])}
                numberOfLines={1}
              >
                {doc.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removeDocument(doc.uri)}>
              <Icon name="close" size={24} color={theme.colors.red} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View>
      <View style={StyleSheet.flatten([S.documentContainer])}>
        <View>{_renderTitle("Documents")}</View>
        <ElevatedView elevation={5}>
          <TouchableOpacity
            style={StyleSheet.flatten([
              S.addButton,
              { backgroundColor: theme.colors.primary },
            ])}
            activeOpacity={0.8}
            onPress={pickDocuments}
          >
            <Icon name="add-circle" size={14} color={theme.colors.white} />
            <Text
              style={StyleSheet.flatten([
                S.addButtonTitle,
                { color: theme.colors.white, fontFamily: Fonts.semibold },
              ])}
            >
              {LEAVE_REQUEST_CONFIG.addButtonTitle}
            </Text>
          </TouchableOpacity>
        </ElevatedView>
      </View>

      {_renderDocuments()}
    </View>
  );
};
