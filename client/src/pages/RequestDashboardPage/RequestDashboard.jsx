import RequestCard from "./RequestCard";

const RequestDashboard = () => {
  return (
    <main className="flex-1 flex flex-col items-center gap-12 py-7 px-12 overflow-auto">
      <h1 className="text-3xl">Referral Request</h1>

      <div className="w-full grid grid-cols-2 gap-10">
        <RequestCard company="Google" priority={1} status="waiting"/>
        <RequestCard company="Amazon" priority={1} status="waiting"/>
        <RequestCard company="Meta" priority={1} status="approved"/>
        <RequestCard company="LinkedIn" priority={1} status="referred"/>
        <RequestCard company="Netflix" priority={1} status="waiting"/>
        <RequestCard company="Microsoft" priority={1} status="matched"/>
        <RequestCard company="DoorDash" priority={1} status="waiting"/>
        <RequestCard company="Vanta" priority={1} status="referred"/>
        <RequestCard company="Tesla" priority={1} status="waiting"/>
      </div>
    </main>
  );
};
export default RequestDashboard;
