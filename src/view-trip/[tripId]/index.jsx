import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import InfoSection from '../components/infoSection';
import Hotels from '../components/Hotels';
import { toast } from 'sonner';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    const GetTripData = async () => {
        try {
            setLoading(true);
            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document:", docSnap.data());
                setTrip(docSnap.data());
            } else {
                console.log("No Such Document");
                toast.error('No trip Found!');
            }
        } catch (error) {
            console.error("Error fetching trip:", error);
            toast.error('Failed to load trip data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!trip) {
        return <div className="flex justify-center items-center h-screen">Trip not found</div>;
    }

    return (
        <div className="p-10 md:px-20 Lg:px-44 xl:px-56">
            <h1 className="text-2xl font-bold mb-4">Trip Details</h1>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            {trip && <Hotels trip={trip} />}
            {/* <Hotels trip={trip} /> */}
            {/* Daily Plan */}
        </div>
    );
}

export default Viewtrip