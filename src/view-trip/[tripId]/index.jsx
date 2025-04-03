import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import InfoSection from '../components/infoSection';

function Viewtrip() {
    const [trip, setTrip] = useState(null);

    const GetTripData=async()=>{
    const docRef=doc(db,'AITrips', tripId);
    const docSnap=await getDoc(docRef)

    if(docSnap.exists()){
    console.log ("Document:", docSnap.data());
    setTrip(docSnap.data());
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
    <div className='p-10 md:px-20 Lg:px-44 xl:px-56'>
      Viewtrip:{tripId}
      {/* Information Section */}
      {trip && <InfoSection trip={trip}/>}
      {/* Recommended Hotels */}
      {/* Daily Plan */}
    </div>
  );
}

export default Viewtrip