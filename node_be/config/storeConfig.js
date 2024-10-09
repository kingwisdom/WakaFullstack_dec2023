import { promises as fs } from 'fs'; // Destructure 'promises' directly from 'fs'
// const filePath = './config/placesstore.json';
const filePath = "https://6zc4fswo1jbqmzqs.public.blob.vercel-storage.com/placesstore-PUjvuvgpYUgq7ArIDOB6Egggjyw7eb.json";

export const writePlacesToFile = async (data) => {
    const existingData = await readPlacesFromFile();
    existingData.places.push(data);
    const jsonData = JSON.stringify(existingData, null, 2);

    try {

        await fs.writeFile(filePath, jsonData); // Use await to write the file
        console.log('JSON data written to', filePath);
    } catch (err) {
        console.error('Error writing file:', err);
    }
};

export const readPlacesFromFile = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8'); // Read the file with UTF-8 encoding
        const jsonData = JSON.parse(data);
        console.log('JSON data read from', filePath, jsonData);
        return jsonData;
    } catch (err) {
        console.error('Error:', err);
    }
};
