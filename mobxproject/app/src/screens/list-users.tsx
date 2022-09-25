import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { UsersParams } from "../../utils/models/models/users";
import { useStores } from "../../utils/store/config/root-store/root-store-context";

const ListUsers = () =>{

    const {usersStoreModel} = useStores();
    const {users} = usersStoreModel;

    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        refreshUserList();
    },[])

    const addUser = async () =>{
        let user : UsersParams = {username : 'username',password:'password'};
        await usersStoreModel.postUsers('',user);
        refreshUserList();
    }

    const deleteUser = async (userParam:any) =>{
        let user : UsersParams = {username : userParam.username,password:userParam.password};
        await usersStoreModel.deleteUser('',user)
        refreshUserList();
    }

    const refreshUserList = async () =>{
        setLoading(true);
        await usersStoreModel.resetUsers();
        await usersStoreModel.getUsers();
        setLoading(false);
    }

    const UserItem = ({item,index}:any) =>{
        return(
            <View key={index} style={{flexDirection:'row',width:'100%',justifyContent:'space-around'}}>
                <View style={{width:'80%',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                    <Text>{item.username}</Text>
                    <Text>{item.password}</Text>
                </View>
                <View style={{width:'20%'}}>
                    <TouchableOpacity onPress={()=>{deleteUser(item)}}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const FooterList = () =>{
        return (
            loading ? 
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>Loading</Text>
            </View> : null
        )
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Users List</Text>
            <View style={{flexDirection:'row',justifyContent:'space-around'
            ,width:'100%',alignItems:'center',height:50,margin:10}}>
                <TouchableOpacity onPress={addUser}>
                    <Text>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={refreshUserList}>
                    <Text>Refresh</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={users}
                renderItem={UserItem}
                ListFooterComponent = {FooterList}
            />
        </View>
    )
}

export default  observer(({ timer }:any) => ListUsers());
