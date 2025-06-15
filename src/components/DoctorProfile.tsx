
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DoctorProfile = () => (
  <div className="bg-softblue rounded-2xl flex gap-4 items-center p-5 shadow-md">
    <Avatar className="w-20 h-20 shadow border-4 border-white">
      <AvatarImage src="https://randomuser.me/api/portraits/men/50.jpg" alt="Dr. James" />
      <AvatarFallback>DJ</AvatarFallback>
    </Avatar>
    <div>
      <h2 className="text-2xl font-bold text-softblue-800 font-sans mb-1">Dr. James</h2>
      <p className="text-lg text-softblue-800 font-sans">General Practitioner</p>
    </div>
  </div>
);

export default DoctorProfile;
