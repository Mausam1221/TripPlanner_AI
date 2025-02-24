import React, { use, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const[openDailog,setOpenDailog]=useState(false);
  const handleInputChange = (name, value) => {
    // if (name == "noOfDays" && value > 5) {
    //   console.log("Please enter Trip Days less than 5");
    //   return;
    // }

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip=async()=>{
    const user=localStorage.getItem('user');
    if(!user)
    {
      setOpenDailog(true);
      return;
    }




    if (formData?.noOfDays>5&&!formData?.location||!formData?.budget||!formData?.traveler)
    {
      toast("Please fill all details.")
    return ;
    }
    const FINAL_PROMPT=AI_PROMPT
    .replace("{location}",formData?.location?.label)
    .replace("{totalDays}",formData?.noOfDays)
    .replace("{budget}",formData?.budget)
    .replace("{traveler}",formData?.traveler)
    .replace("{totalDays}",formData?.noOfDays)
    console.log(FINAL_PROMPT);

    const result=await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-5">
      <h2 className="font-bold text-3xl">Trip Preferences</h2>
      <p className="text-gray-500 mt-3 text-xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione id sint
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">Choose Your Destination:</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip:
          </h2>
          <Input
            type="number"
            placeholder="Eg.3"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl my-3 font-medium">What is your Budget:</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg 
              ${formData?.budget === item.title && "shadow-lg border-black"}
              `}
              >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you want to travel with:
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg
            ${formData?.traveler === item.people && "shadow-lg border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
              <h2 className="text-sm text-gray-500">{item.people}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 justify-end flex'>
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
      <Dialog open={openDailog}>
        
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-8">Sign in with google</h2>
              <Button className="w-full mt-5 flex gap-4 items-center"><FcGoogle className='h-8 w-8'/>Sign In With Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;
