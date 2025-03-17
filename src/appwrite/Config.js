import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status = "draft", userId }) {
        try {
            const uniqueSlug = slug + "-" + Date.now(); // Ensure uniqueness
            
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                uniqueSlug,  // Use unique slug to prevent conflicts
                { title, content, featuredImage, status, userId }
            );
            
            console.log("Created Post:", post);
            return post;
        } catch (error) {
            console.error("Appwrite Service :: createPost :: error", error.message);
            return null;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status = "draft" }) {
        try {
            const updatedPost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
            
            console.log("Updated Post:", updatedPost);
            return updatedPost;
        } catch (error) {
            console.error("Appwrite Service :: updatePost :: error", error.message);
            return null;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            console.log("Deleted Post with slug:", slug);
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deletePost :: error", error.message);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            console.log("Fetched Post:", post);
            return post;
        } catch (error) {
            console.error("Appwrite Service :: getPost :: error", error.message);
            return null;
        }
    }

    async getPosts(queries = []) {
        try {
            console.log("Fetching posts with queries:", queries);

            if (await this.isFieldInSchema("status")) {
                queries.push(Query.equal("status", "active"));
            }

            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                queries
            );
            
            console.log("Fetched Posts:", response.documents);
            return response.documents;
        } catch (error) {
            console.error("Appwrite Service :: getPosts :: error", error.message);
            return [];
        }
    }

    async uploadFile(file) {
        try {
            const uploadedFile = await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
            console.log("Uploaded File:", uploadedFile);
            return uploadedFile;
        } catch (error) {
            console.error("Appwrite Service :: uploadFile :: error", error.message);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            console.log("Deleted File ID:", fileId);
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deleteFile :: error", error.message);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    }

    async isFieldInSchema(fieldName) {
        try {
            const collection = await this.databases.getCollection(conf.appwriteDatabaseId, conf.appwriteCollectionId);
            return collection.attributes.some(attr => attr.key === fieldName);
        } catch (error) {
            console.warn("Could not verify schema field:", fieldName, error.message);
            return false;
        }
    }
}

const service = new Service();
export default service;
