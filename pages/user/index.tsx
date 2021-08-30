import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";

type NextPageProps = { data: { name: string } };

const User: NextPage<NextPageProps> = (props) => {
  const { name } = props.data;

  return (
    <div className={styles.container}>
      <main className={styles.main}>{name}</main>
    </div>
  );
};

User.getInitialProps = async () => {
  const response = await fetch("http://localhost:3000/api/user");
  const data = await response.json();

  return { data };
};

export default User;
