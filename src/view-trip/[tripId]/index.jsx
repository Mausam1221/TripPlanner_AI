import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Viewtrip() {


    const GetTripData=async()=>{
    const docRef=doc(db,'AITrips', tripId);
    const docSnap=await getDoc(docRef)

    if(docSnap.exists()){
    console.log ("Document:", docSnap.data());
    }
    else{
    console.log ("No Such Document");
    toast ('No trip Found!')
    }
    }
    const {tripId}=useParams ();
    useEffect(() => {
      tripId&&GetTripData();
    }, [tripId])
    
  return (
    <div>Viewtrip:{tripId}</div>
  )
}

export default Viewtrip