import {Dimensions, StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container:{
        padding:12,
        flex:1,
        bbackgroundColor:'#F7F7F7',
    },
    team_container:{
      
        flexDirection:'row',
        padding:6,
        justifyContent:'center'
    },
    image:{
        height:60,
        width:60,
        borderRadius:30,
    },
    title:{
        color:'black',
        fontWeight:'500',
        fontSize:16,
        marginBottom:'auto',
        marginTop:'auto',
        marginLeft:18,
    },
    inner_container:{
        marginTop:24,
    },
    members_container:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/1.8,
        padding:8,
    },
    members:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
    },
    memberImage:{
        height:54,
        width:54,
        borderRadius:27,
        borderWidth:3,
        borderColor:'orange',
    },
    memberText:{
        color:'black',
        fontStyle:'italic'
    },
    hrElement:{
        height:4,
        width:Dimensions.get('window').width,
        backgroundColor:'orange',
        position:'relative'
    },
    captain:{},

    backgroundimage:{
        flex:1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/1.6,
        
    },
    forvet:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    ortasaha:{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between',
        padding:30,
        marginTop:20
    },
    defans:{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-around',
     
    },
    kaleci:{
        display:'flex',
        alignItems:'center',
        marginTop:30
    },
})
export default styles;
