export const Item = ({ imgUrl, name }) => {
  return (
    <div className="flex">
      <img src={imgUrl} alt="company" className="w-6 h-6 rounded-full" />
      <span className="ml-2">{name}</span>
    </div>
  );
};
