import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
// using different import to avoid webpack module aliasiing (to illustrate nextjs getServerSideProps() tree shaking)
import { makeXhrCacheHelper } from "../../src/SERVER_ONLY_MODULES";
import { HelperLinks } from "src/common/HelperLinks";

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

export async function getServerSideProps() {
  const xhrCacheHelper = makeXhrCacheHelper();
  if (xhrCacheHelper) {
    const { getKey } = xhrCacheHelper;
    const dataString = (await getKey("userData")) as string;
    if (dataString) {
      const data = JSON.parse(dataString);
      return { props: { data } };
    }
  }

  const response = await fetch("http://localhost:3000/api/user");
  const data = await response.json();

  if (xhrCacheHelper) {
    const { setKey } = xhrCacheHelper;
    const dataString = JSON.stringify(data);
    await setKey("userData", dataString);
  }

  return { props: { data } };
}

export default User;