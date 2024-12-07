/* // eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Use environment variables from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setError(null);
    }

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }

        try {
            setUploading(true);
            setError(null);

            // Generate a unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `uploads/${fileName}`;

            // Upload the file
            const { error: uploadError } = await supabase.storage
                .from('hotel')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('hotel')
                .getPublicUrl(filePath);

            console.log('File uploaded successfully:', publicUrl);
            setImageUrl(publicUrl);
            setFile(null);

            // Reset file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';

        } catch (err) {
            console.error('Error uploading:', err);
            setError(err.message || 'Error uploading file');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="image-uploader">
            <input 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*"
                disabled={uploading}
            />
            <button 
                onClick={handleUpload} 
                disabled={!file || uploading}
            >
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>

            {error && (
                <p style={{ color: 'red' }}>{error}</p>
            )}

            {imageUrl && (
                <div>
                    <p>Uploaded Image:</p>
                    <img 
                        src={imageUrl} 
                        alt="Uploaded" 
                        style={{ maxWidth: '300px', marginTop: '10px' }} 
                    />
                </div>
            )}
        </div>
    );
}

export default ImageUploader; */