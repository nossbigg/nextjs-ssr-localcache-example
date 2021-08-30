import Memcached from "memcached";

export const makeXhrCacheHelper = () => {
  const memcached = new Memcached("localhost:11211");

  const closeConnection = () => {
    memcached.end();
  };

  const setKey = async (key: string, value: any) => {
    return new Promise((resolve) => {
      memcached.set(key, value, 60, resolve);
    });
  };

  const getKey = async (key: string) => {
    const data = await new Promise((resolve) => {
      memcached.get(key, (err, data) => resolve(data));
    });
    return data;
  };

  return { setKey, getKey, closeConnection };
};
