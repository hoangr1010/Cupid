export const generatePasscode = () => {
  const passcode = Math.floor(100000 + Math.random() * 900000);
  return passcode.toString();
};
