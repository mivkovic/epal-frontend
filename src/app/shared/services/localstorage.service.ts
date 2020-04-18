export class LocalstorageService {
  public static getItem(key: string) {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(key);
  }

  public static setItem(key: string, value: any) {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    localStorage.setItem(key, value);
  }

  public static removeItem(key: string) {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    localStorage.removeItem(key);
  }
}
