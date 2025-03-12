import Conf from "../Conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(Conf.appwriteUrl)
      .setProject(Conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  //Create a new Post
  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("There was an error creating the post", error);
    }
  }

  //Update a Post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("There was an error updating the post", error);
      return false;
    }
  }

  //Delete a Post
  async deletrPost(slug) {
    try {
      await this.databases.deleteDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("There was an error deleting the post", error);
      return false;
    }
  }

  //Get a Post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("There was an error getting the post", error);
    }
  }

  //Get all Posts
  async getPosts() {
    try {
      return await this.databases.listDocuments(
        Conf.appwriteDatabaseId,
        Conf.appwriteCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("There was an error getting the posts", error);
      return false;
    }
  }

                      /*File Service*/

  //Upload a File
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        Conf.appwriteBucketsId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("There was an error uploading the file", error);
      return false;
    }
  }

  //Delete a File
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(Conf.appwriteBucketsId, fileId);
      return true;
    } catch (error) {
      console.log("There was an error deleting the file", error);
      return false;
    }
  }
// File Preview
  getFilePreview(fileId) {
    return this.storage.getFilePreview(Conf.appwriteBucketsId, fileId);
  }
}
const service = new Service();
export default service;
