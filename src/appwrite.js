import {Client, Databases, ID, Query} from 'appwrite';
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const COLLECTION_FEATURED = import.meta.env.VITE_APPWRITE_COLLECTION_FEATURED;

const client = new Client() 
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

const databases = new Databases(client);

export const addFavorites = async(recipe) => {
    try {

        const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('meal_id', recipe.idMeal)
        ]);

        if(existing.total > 0){
            const docId = existing.documents[0].$id;
            await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, docId);
            return false
        }

        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            meal_name: recipe.strMeal,
            meal_id: recipe.idMeal,
            meal_thumb: recipe.strMealThumb,
        })
        return true
    } catch (error) {
        console.log("APPWRITE :: addFavorites :: error", error);
    }
}

export const favoritesList = async() => {
    try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        return res.documents;
    } catch (error) {
        console.log("APPWRITE :: favoritesList :: ERROR", error);
    }
}

export const mostSearch = async(recipe) => {
    try {
        const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_FEATURED, [
            Query.equal("meal_id", recipe.idMeal)
        ]);

        if(existing.documents.length > 0){
            const docId = existing.documents[0].$id;
            const currentCount = existing.documents[0].search_count || 0;

            await databases.updateDocument(DATABASE_ID, COLLECTION_FEATURED, docId, {
                search_count: currentCount + 1
            })
        } else {
            await databases.createDocument(DATABASE_ID, COLLECTION_FEATURED, ID.unique(), {
                meal_name: recipe.strMeal,
                meal_id: recipe.idMeal,
                meal_thumb: recipe.strMealThumb || "",
                search_count: 1
            })
        }

    } catch (error) {
        console.log("APPWRITE :: mostSearch :: error", error);
    }
}

export const topSearch = async() => {
    try {
        const results = await databases.listDocuments(DATABASE_ID, COLLECTION_FEATURED, [
            Query.limit(5),
            Query.orderDesc('search_count')
        ])

        return results.documents
    } catch (error) {
        console.log("APPWRITE :: topSearch :: error", error)
    }
}