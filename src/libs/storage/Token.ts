import { StorageKeys } from "../enums/enums";
import BaseStorage from "./BaseStorage";

class Token extends BaseStorage {
  isValidToken(): boolean {
    const isValid: boolean = Boolean(super.get(StorageKeys.USER_TOKEN));

    return isValid;
  }

  setToken(token: string): void {
    super.set(StorageKeys.USER_TOKEN, token);
  }

  removeToken(): void {
    super.remove(StorageKeys.USER_TOKEN);
  }
}

export { Token };
