import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Button,
    Text,
    FlatList,
    Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import Canvas from "react-native-canvas";
import { firebase } from "../firebase/config";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // image: {
    //     height: 400,
    //     resizeMode: "contain",
    //     width: 400,
    // },
});

export function AddRecipe(): React.ReactElement {
    const [ocr, setOcr] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [imgStyle, setImgStyle] = useState({ height: 200, width: 300 });
    const [uploading, setUploading] = useState(false);
    // const [imagePath, setImagePath] = useState("");

    async function submitToGoogle(imagePath) {
        const body = JSON.stringify({
            requests: [
                {
                    features: [
                        // { type: "LABEL_DETECTION", maxResults: 10 },
                        // { type: "LANDMARK_DETECTION", maxResults: 5 },
                        // { type: "FACE_DETECTION", maxResults: 5 },
                        // { type: "LOGO_DETECTION", maxResults: 5 },
                        // { type: "TEXT_DETECTION" },
                        { type: "DOCUMENT_TEXT_DETECTION" },
                        // { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                        // { type: "IMAGE_PROPERTIES", maxResults: 5 },
                        // { type: "CROP_HINTS", maxResults: 5 },
                        // { type: "WEB_DETECTION", maxResults: 5 },
                    ],
                    image: {
                        source: {
                            imageUri: imagePath,
                        },
                    },
                },
            ],
        });

        const response = await fetch(
            "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAsIDki7e_fARRYmbhUdrj3WsoVAJkGjIk",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body,
            },
        );

        const responseJson = await response.json();
        console.log(responseJson);
        // setOcr(responseJson.responses[0].textAnnotations);

        // save temp data to realtime so we are not hammering usage
        const temp = firebase.database().ref("/temp");
        const updatedTemp = temp.push();
        updatedTemp.set(responseJson).then(() => {
            // alert(error ? "Failed to save the data to the storage" : "Saved");
        });
    }

    async function loadImage() {
        const url = await firebase
            .storage()
            .ref("/image-uploads")
            .child("dd509d2e-c75f-4aad-ab3b-0b02cc6e264c")
            .getDownloadURL();

        await submitToGoogle(url);
    }


    function getBlockText(block) {
        let result = "";
        block.paragraphs.forEach((paragraph) => {
            paragraph.words.forEach((word) => {
                word.symbols.forEach((symbol) => {
                    result += symbol.text;
                    if (symbol.property && symbol.property.detectedBreak) {
                        const breakType = symbol.property.detectedBreak.type;
                        if (["EOL_SURE_SPACE" ,"SPACE"].includes(breakType)) {
                            result += " ";
                        }
                        if (["EOL_SURE_SPACE" ,"LINE_BREAK"].includes(breakType)) {
                            result += "\n"; // Perhaps use os.EOL for correctness.
                        }
                    }
                });
            });
        });

        return result;
    }

    function getTextBlocks(result) {

        let textBlocks = [];
        let blockIndex = 0;
        // visionResults.forEach((result) => {
            result.fullTextAnnotation.pages.forEach((page) => {
                textBlocks = textBlocks.concat(page.blocks.map((block) => ({
                    blockIndex: blockIndex++,
                    text: getBlockText(block),
                })));
            });
        // });
        return textBlocks;
    }

    useEffect(() => {
        async function getOCR() {
            await firebase.database()
                .ref("/temp/-MoJn2wYw937YMl257gh/responses/0")
                .on("value", (data) => {
                    const result = data.val();

                    setOcr(getTextBlocks(result));
                    // setOcr(data.val());
                });

                console.log(1);


            const url = await firebase
                .storage()
                .ref("/image-uploads")
                .child("296e0a0f-b380-4701-82a8-a0e55c7ffbe0")
                .getDownloadURL();
            setImageURL(url);

            const imageConfig = await firebase
                .database()
                .ref("/temp/-MlQXNQxRq-d6sayW_Wf/responses/0/fullTextAnnotation/pages/0")
                .on("value", (data) => {
                    const d = data.val();
                    setImgStyle({
                        height: d.height/10,
                        width: d.width/10,
                    });
                    // styles.image.width = d.width;
                    // styles.image.height = d.height;
                });
        }
        getOCR();
    }, []);

    async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const ref = firebase
            .storage()
            .ref("/image-uploads")
            .child(uuid.v4());

        const snapshot = await ref.put(blob);

        // We're done with the blob, close and release it
        blob.close();

        return snapshot.ref.getDownloadURL();
    }

    async function handleImagePicked(pickerResult) {
        try {
            setUploading(true);

            if (!pickerResult.cancelled) {
                const uploadUrl = await uploadImageAsync(pickerResult.uri);
                // setImagePath(uploadUrl);
                await submitToGoogle(uploadUrl);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setUploading(false);
        }
    }

    async function takePhoto() {
        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        handleImagePicked(pickerResult);
    }

    function renderItem({ item }) {
        return (
            <>
                <Text>------------------------------</Text>
                <Text>{item.text}</Text>
            </>
        );
    }

    function handleCanvas(canvas) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "purple";
        ctx.fillRect(0, 0, 100, 100);
    }

    return (
        <View style={styles.container}>
            <Button onPress={takePhoto} title="Take a photo" />
            <Button onPress={loadImage} title="Load photo" />

            <Canvas ref={handleCanvas} />
            <Image
                style={imgStyle}
                source={{ uri: imageURL }}
            />
            <FlatList
                data={ocr}
                keyExtractor={(item, index) => index}
                renderItem={renderItem}
            />
        </View>
    );
}
