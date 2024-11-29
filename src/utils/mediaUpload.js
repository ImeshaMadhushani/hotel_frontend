/* // eslint-disable-next-line no-unused-vars
import React from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export default async function uploadMedia(file) {
    if (!file) {
        console.error('No file selected');
        return null;
    }

    try {
        // Upload the file to the Supabase storage bucket
        const { data, error } = await supabase.storage
            .from('SunShine-Images')
            .upload(file.name, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            throw new Error(error.message);
        }

        console.log('File uploaded successfully:', data);

        // Generate a public URL for the uploaded file
        const { data: publicUrlData, error: publicUrlError } = supabase.storage
            .from('SunShine-Images')
            .getPublicUrl(file.name);

        if (publicUrlError) {
            throw new Error(publicUrlError.message);
        }

        console.log('Public URL:', publicUrlData.publicUrl);
        return publicUrlData.publicUrl;
    } catch (error) {
        console.error('Error uploading file:', error.message);
        return null;
    }
}
 */