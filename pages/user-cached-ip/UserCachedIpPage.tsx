import type { NextPage } from "next";
import { HelperLinks } from "src/common/HelperLinks";
import styles from "../../styles/Home.module.css";

// xhrCacheHelper module, lazy loaded
const noop = () => {};
const getMakeXhrCacheHelper = async () => {
  const module = await import("@SERVER_ONLY_MODULES");
  if (!module) {
    return noop;
  }
  return module.makeXhrCacheHelper;
};

type NextPageProps = { data: { name: string } };

const User: NextPage<NextPageProps> = (props) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {JSON.stringify(props.data)}
        <br />
        <br />
        <HelperLinks />
      </main>
    </div>
  );
};

User.getInitialProps = async () => {
  const makeXhrCacheHelper = await getMakeXhrCacheHelper();
  const xhrCacheHelper = makeXhrCacheHelper();
  if (xhrCacheHelper) {
    const { getKey } = xhrCacheHelper;
    const dataString = await getKey("userData");
    if (dataString) {
      const data = JSON.parse(dataString);
      return { data };
    }
  }

  const response = await fetch("http://localhost:3000/api/user");
  const data = await response.json();

  if (xhrCacheHelper) {
    const { setKey } = xhrCacheHelper;
    const dataString = JSON.stringify(data);
    await setKey("userData", dataString);
  }

  return { data };
};

export default User;
