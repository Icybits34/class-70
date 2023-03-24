import React,{Component} from "react";
import { View,Text,StyleSheet,TouchableOpacity,TextInput,Image,ImageBackground } from "react-native";
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner"

export default class TransactionScreen extends Component {

    constructor(props){
        super(props)
        this.state={
            domState:"normal",
            bookId:"",
            studentId:"",
            hasCameraPermissions: null,
            scanned:false,
            scannedData:""
        }
    }

getCameraPermissions=async domState=>{
    const{status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions:status==="granted",
        domState:domState,
        scanned:false

    })
}

handleBarcodeScanned=async ({type,data})=>{
    this.setState({
        scannedData:data,
        domState:"normal",
        scanned:true,
    })
}
    render()
    {
        const{domState,hasCameraPermissions,scanned,scannedData}=this.state
        if(domState==="scanner"){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}></BarCodeScanner>
            )
        }
        return(
            <View style={styles.container}>
                <View style={styles.lowerContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                    style={styles.textInput}
                    placeholder={"bookId"}
                    placeholderTextColor={"white"}
                    value={bookId}></TextInput>
                    <TouchableOpacity
                    style={styles.scanButton}>
                        <Text style={styles.scanButtonText}>scan</Text>
                    </TouchableOpacity>
                    </View>
                <Text style={styles.text}>
                    {hasCameraPermissions ? scannedData : "request for Camera permissions"}
                </Text>
                <TouchableOpacity style ={styles.button}
                onPress={()=>this.getCameraPermissions("scanner")}>
                <Text style={styles.text}>Scan Qr Code</Text>
                </TouchableOpacity>
            </View>
            </View>


        )
    }
}

const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"#5653D4",
        },
        text:{
            color:"#FFFF",
            fontSize:30,
        },
        button:{
            width:"43%",
            height: 55,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"orange", 
        },
    }
)
