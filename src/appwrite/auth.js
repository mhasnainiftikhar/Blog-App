import Conf from "../Conf/Conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(Conf.appwriteUrl)
      .setProject(Conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //Create a new Account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.client.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //Login
  async login({ email, password }) {
    try {
      return await this.client.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //Get Current User
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("There was an error getting the current user", error);
    }
    return null;
  }

  //Logout
  async logout() {
    try {
      await this.client.deleteSessions();
    } catch (error) {
      console.log("There was an error logging out", error);
    }
  }
}

const authService = new AuthService();

export default authService;
