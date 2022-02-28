import * as React from "react";
import {View, Button, Image, Platform} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default class PickImage extends React.Component{
    constructor(){
        super();
        this.state = {
            image: null
        }
    }

    render(){
        let {image} = this.state;

        return(
            <View>
                <Button title = {"Pick an image frm the camera roll"}
                onPress = {this.pickimage}/>
            </View>
        )
    }

    componentDidMount(){
        this.getPermissions();
    }

    getPermissions = async() => {
        if(Platform.OS !== "web"){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if(status !== "granted"){
                alert("Sorry camera permissions are needed for this app to work");
            }
        }
    }
    uploadImage =  async (uri) => {
        const data = new FormData();
        var filename = uri.split("/")[uri.split("/").length - 1]
        var imagetype = `image/${uri.split('.')[uri.split('.').length - 1]}`
        const filetoupload = {
            uri: uri,
            name: filename,
            type: type
        }
        data.append("digit", filetoupload);
        fetch("", {
            method: "POST", body: dAnimation, headers: {"content-type": "multipart/form-data"}
        }).then((response) => response.json()).then((result)=>{
            console.log("Success: ", result);
        }).catch((error)=>{
            console.log("Error: ", error)
        });
    }
    pickimage = async() => {
        try{
            var result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            });
            if(!result.cancelled){
                this.setState({image: result.data});
                this.uploadImage(result.uri);
            }
        }
        catch(E){
            console.log(E);
        }
    }
}