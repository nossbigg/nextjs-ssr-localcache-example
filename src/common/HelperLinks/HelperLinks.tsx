// not using nextjs <Link /> to deliberately avoid prefetching
/* eslint-disable @next/next/no-html-link-for-pages */

export const HelperLinks = () => {
  return (
    <div>
      <a href="/user">/user page</a>
      <br />
      <a href="/user-cached-ip">/user-cached-ip page (getInitialProps())</a>
      <br />
      <a href="/user-cached-ssp">
        /user-cached-ssp page (getServerSideProps())
      </a>
      <br />
      <button onClick={onClearCacheButton}>Clear User Data Cache</button>
    </div>
  );
};

const onClearCacheButton = async () => {
  await fetch("http://localhost:3000/api/clearCache");
  alert("cache cleared!");
};
