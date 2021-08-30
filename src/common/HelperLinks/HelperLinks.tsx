export const HelperLinks = () => {
  return (
    <div>
      <a href="/user">/user page</a>
      <br />
      <a href="/user-cached">/user-cache page</a>
      <br />
      <button onClick={onClearCacheButton}>Clear User Data Cache</button>
    </div>
  );
};

const onClearCacheButton = async () => {
  await fetch("http://localhost:3000/api/clearCache");
  alert("cache cleared!");
};
