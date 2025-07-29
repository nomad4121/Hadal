import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput, Button } from 'react-native';

// Mascot and multiple profile demo
const avatars = [
  require('../assets/avatar1.png'),
  require('../assets/avatar2.png'),
  require('../assets/avatar3.png'),
];

type Profile = { id: number, name: string, avatarIdx: number };
const mascotImg = require('../assets/mascot.png');

export default function ProfileScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([
    { id: 1, name: "Ayaan", avatarIdx: 0 },
    { id: 2, name: "Maxamed", avatarIdx: 2 }
  ]);
  const [active, setActive] = useState(0);
  const [newName, setNewName] = useState("");

  const addProfile = () => {
    if (newName.trim()) {
      setProfiles([
        ...profiles,
        { id: Date.now(), name: newName.slice(0,12), avatarIdx: 0 }
      ]);
      setNewName("");
    }
  };
  const setAvatar = (idx:number) => {
    setProfiles(ps => ps.map((p,i) => i===active ? {...p, avatarIdx: idx} : p));
  };

  return (
    <View style={styles.container}>
      <Image source={mascotImg} style={styles.mascot} />
      <Text style={styles.title}>Profiles</Text>
      <FlatList
        data={profiles}
        horizontal
        renderItem={({item,i}) => (
          <TouchableOpacity onPress={()=>setActive(i)} style={{margin:8, borderBottomWidth: active===i?2:0}}>
            <Image source={avatars[item.avatarIdx]} style={styles.avatar} />
            <Text style={{textAlign:'center'}}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={p=>p.id.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="New name"
        value={newName}
        onChangeText={setNewName}
        maxLength={12}
      />
      <Button title="Add Profile" onPress={addProfile} />
      <Text style={styles.subtitle}>Change Avatar for {profiles[active]?.name}</Text>
      <View style={styles.avatarRow}>
        {avatars.map((av, idx) => (
          <TouchableOpacity key={idx} onPress={() => setAvatar(idx)}>
            <Image
              source={av}
              style={[
                styles.avatar,
                idx === profiles[active].avatarIdx && { borderColor: 'blue', borderWidth: 3 }
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingVertical:24 },
  mascot: { width: 60, height: 60, resizeMode:'contain', margin:8 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  avatarRow: { flexDirection: 'row', marginBottom: 16 },
  avatar: { width: 60, height: 60, borderRadius: 30, margin: 8 },
  subtitle: { fontSize: 16, marginTop: 12 },
  input: { borderColor:'#ccc', borderWidth:1, borderRadius:8, padding:6, width:120, margin:8 }
});