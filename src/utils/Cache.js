/**
 * Created By Kazeem Olanipekun
 */
import { Encrypt } from "./Encrypt";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /**
   * Set Data to storage
   * @param key
   * @param data
   * @param cb
   */
  async set(key: string, data: any, cb?: Function) {
    if (!data) {
      return;
    }
    try {
      localStorage.setItem(key, Encrypt.encrypt(data));
      if (cb) {
        cb();
      }
    } catch (e) {
      // error
      if (cb) {
        cb(e);
      }
    }
  },

  /**
   * get Data from storage
   * @param key
   */
  async get(key: string) {
    try {
      return Encrypt.decrypt(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },

  /**
   * Used to clear cache Data
   */
  async clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      return null;
    }
  },

  /**
   * This is used to remove a data by key
   * @param key
   */
  async remove(key: string) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return null;
    }
  },
};
